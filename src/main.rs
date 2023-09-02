#[macro_use]
extern crate serde_derive;
extern crate tinytemplate;

#[path = "js.rs"]
mod js;
use base64::{engine::general_purpose, Engine};
use chrono::NaiveDate;
use lol_html::{element, HtmlRewriter, Settings};
use serde::{de, Deserializer, Serializer};
use serde_yaml;
use std::{
    collections::HashMap,
    env, fmt,
    fs::{self, read_to_string, File},
    io::{self},
    path::{Path, PathBuf},
    sync::{Arc, Mutex},
    thread::spawn,
    time::Instant,
};
use thumbhash::rgba_to_thumb_hash;
use tinytemplate::TinyTemplate;

const TITLE: &str = "Angus Findlay";
const DESCRIPTION: &str = "Angus Findlay's Blog - angusjf";
const CANONICAL_ORIGIN: &str = "https://angusjf.com";
const IMG: &str = "/images/plants.webp";
const ROOT_IMG_RENDERED_SIZE: u32 = 244;
const SRCSET_RESOLUTIONS: [u32; 2] = [1, 2];

#[derive(Deserialize)]
struct ExperimentMetadata {
    summary: Box<str>,
    title: Box<str>,
    #[serde(deserialize_with = "deserialize_date")]
    date: NaiveDate,
    img_url: Box<str>,
    img_alt: Box<str>,
    urls: Vec<Link>,
}

#[derive(Clone, Deserialize)]
struct BlogMetadata {
    title: Box<str>,
    summary: Box<str>,
    #[serde(deserialize_with = "deserialize_date")]
    date: NaiveDate,
    img_url: Box<str>,
    img_alt: Box<str>,
    #[allow(dead_code)]
    tags: Vec<Box<str>>,
    hidden: bool,
    seo_description: Box<str>,
    #[serde(default)]
    path: Box<str>,
}

#[derive(Serialize)]
struct Root {
    title: Box<str>,
    img_url: Box<str>,
    img_alt: Box<str>,
    canonical_origin: Box<str>,
    path: Box<str>,
    description: Box<str>,
    index: Option<Index>,
    blog: Option<Blog>,
}

#[derive(Serialize)]
struct Index {
    cards: Vec<Card>,
}

#[derive(Serialize)]
struct Blog {
    content: Box<str>,
    #[serde(serialize_with = "serialize_date")]
    date: NaiveDate,
}

#[derive(Serialize)]
struct Card {
    img_url: Box<str>,
    img_alt: Box<str>,
    title: Box<str>,
    content: Box<str>,
    links_to: Box<str>,
    #[serde(serialize_with = "serialize_optional_date")]
    date: Option<NaiveDate>,
    links: Vec<Link>,
}

#[derive(Serialize, Deserialize)]
struct Link {
    href: Box<str>,
    label: Box<str>,
    icon: Box<str>,
}

pub fn serialize_optional_date<S>(date: &Option<NaiveDate>, s: S) -> Result<S::Ok, S::Error>
where
    S: Serializer,
{
    match date {
        Some(date) => serialize_date(date, s),
        _ => s.serialize_none(),
    }
}

pub fn serialize_date<S>(date: &NaiveDate, s: S) -> Result<S::Ok, S::Error>
where
    S: Serializer,
{
    s.serialize_str(&date.format("%-d %b '%y").to_string())
}

fn deserialize_date<'de, D>(deserializer: D) -> Result<NaiveDate, D::Error>
where
    D: Deserializer<'de>,
{
    struct Visitor;

    impl<'de> de::Visitor<'de> for Visitor {
        type Value = NaiveDate;

        fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
            write!(formatter, "datetime string")
        }

        fn visit_str<E>(self, v: &str) -> Result<NaiveDate, E>
        where
            E: de::Error,
        {
            Ok(v.parse().unwrap())
        }
    }

    deserializer.deserialize_string(Visitor)
}

fn files_in_dir(dir: &str) -> Vec<PathBuf> {
    fs::read_dir(dir)
        .unwrap()
        .map(|res| res.map(|e| e.path()))
        // .filter(|path| path.as_ref().map_or(true, |x| !x.starts_with(".")))
        .collect::<Result<Vec<_>, io::Error>>()
        .unwrap()
}

fn filename_drop_ext<'a>(path: &'a PathBuf, ext: &'a str) -> &'a str {
    path.iter()
        .last()
        .unwrap()
        .to_str()
        .unwrap()
        .strip_suffix(ext)
        .unwrap()
}

/*
 * CARD CONVERTERS
 */
fn blogpost_to_card(blogpost: BlogMetadata) -> Card {
    Card {
        img_url: blogpost.img_url,
        title: blogpost.title,
        content: blogpost.summary,
        links_to: blogpost.path,
        date: Some(blogpost.date),
        img_alt: blogpost.img_alt,
        links: vec![],
    }
}

fn experiment_to_card(experiment: ExperimentMetadata) -> Card {
    Card {
        img_url: experiment.img_url,
        title: experiment.title,
        content: experiment.summary,
        links_to: experiment.urls[0].href.clone(),
        date: Some(experiment.date),
        img_alt: experiment.img_alt,
        links: experiment.urls,
    }
}

/*
 * RENDERERS
 */
fn blogpost(metadata: BlogMetadata, content: Box<str>) -> Root {
    Root {
        img_url: metadata.img_url,
        img_alt: metadata.img_alt,
        canonical_origin: CANONICAL_ORIGIN.into(),
        path: metadata.path,
        description: metadata.seo_description,
        title: metadata.title,
        index: None,
        blog: Some(Blog {
            content,
            date: metadata.date,
        }),
    }
}

fn index(cards: Vec<Card>) -> Root {
    Root {
        img_url: IMG.into(),
        img_alt: TITLE.into(),
        canonical_origin: CANONICAL_ORIGIN.into(),
        path: "".into(),
        description: DESCRIPTION.into(),
        title: TITLE.into(),
        index: Some(Index { cards }),
        blog: None,
    }
}

fn optimize_assets(html: &str, thumbhashes: HashMap<Box<str>, (String, u32)>) -> Box<str> {
    let mut output = vec![];

    let mut rewriter = HtmlRewriter::new(
        Settings {
            element_content_handlers: vec![
                element!("link[rel=stylesheet][href^='/']", |el| {
                    let href = el.get_attribute("href").unwrap();

                    let path = format!("public/{href}");

                    let css = fs::read_to_string(path).unwrap();

                    let content = format!("<style>{css}</style>");

                    el.replace(&content, lol_html::html_content::ContentType::Html);

                    Ok(())
                }),
                element!("script[src^='/']", |el| {
                    let src = el.get_attribute("src").unwrap();

                    let path = format!("public{src}");
                    let path = Path::new(&path);

                    let code = crate::js::bundle(path);

                    let content = format!("<script type='module'>{code}</script>");

                    el.replace(&content, lol_html::html_content::ContentType::Html);

                    Ok(())
                }),
                element!("img[src^='/']", |el| {
                    let src = el.get_attribute("src").unwrap();
                    let src = src.as_str();

                    let image_width = thumbhashes[src].1;

                    let true_scale: f32 = image_width as f32 / ROOT_IMG_RENDERED_SIZE as f32;

                    fn filesize(path: &Path) -> u64 {
                        File::open(path).unwrap().metadata().unwrap().len()
                    }

                    let in_path = "public".to_owned() + src;
                    let in_path = Path::new(&in_path);
                    let ext = in_path.extension().unwrap().to_str().unwrap();
                    let original_size = filesize(in_path);

                    let mut srcset = SRCSET_RESOLUTIONS
                        .map(|pixel_ratio| {
                            let out_path = in_path.with_file_name(format!(
                                "{}_{pixel_ratio}x.{}",
                                in_path
                                    .file_name()
                                    .unwrap()
                                    .to_str()
                                    .unwrap()
                                    .trim_end_matches(ext)
                                    .trim_end_matches("."),
                                ext
                            ));

                            let new_size = filesize(&out_path);

                            if new_size < original_size {
                                // compression achieved
                                let src_scaled =
                                    out_path.to_str().unwrap().strip_prefix("public").unwrap();
                                format!("{src_scaled} {pixel_ratio}x")
                            } else {
                                format!("{src} {pixel_ratio}x")
                            }
                        })
                        .join(", ");
                    srcset.push_str(", ");
                    srcset.push_str(&format!("{src} {true_scale}x"));

                    el.set_attribute("srcset", &srcset).unwrap();

                    Ok(())
                }),
            ],
            ..Settings::default()
        },
        |c: &[u8]| output.extend_from_slice(c),
    );

    rewriter.write(html.as_bytes()).unwrap();
    rewriter.end().unwrap();

    String::from_utf8(output).unwrap().into_boxed_str()
}

fn process_images(cards: &[Card]) -> HashMap<Box<str>, (String, u32)> {
    let filter = if env::args().nth(1).is_some_and(|flag| flag == "--dev") {
        image::imageops::FilterType::Nearest
    } else {
        image::imageops::FilterType::Lanczos3
    };

    let thumbhashes = Arc::new(Mutex::new(HashMap::new()));

    let mut handles = vec![];

    for card in cards {
        let src = card.img_url.clone();
        let thumbhashes = thumbhashes.clone();
        handles.push(spawn(move || {
            let path = Arc::new("public".to_owned() + src.as_ref());
            let image = Arc::new(image::open(&*path).unwrap());

            let resize_handles = [1, 2].map(|pixel_ratio| {
                let image = image.clone();
                let path = path.clone();
                spawn(move || {
                    let in_path = Path::new(&*path);
                    let ext = in_path.extension().unwrap().to_str().unwrap();
                    let out_path = in_path.with_file_name(format!(
                        "{}_{pixel_ratio}x.{}",
                        in_path
                            .file_name()
                            .unwrap()
                            .to_str()
                            .unwrap()
                            .trim_end_matches(ext)
                            .trim_end_matches("."),
                        ext
                    ));
                    let resized = image.resize(
                        ROOT_IMG_RENDERED_SIZE * pixel_ratio,
                        ROOT_IMG_RENDERED_SIZE * pixel_ratio,
                        filter,
                    );

                    resized.save(&out_path).unwrap();
                })
            });
            let hash_handle = spawn(move || {
                let thumb = image.thumbnail(100, 100);
                let thumb_hash = rgba_to_thumb_hash(
                    thumb.width() as usize,
                    thumb.height() as usize,
                    &thumb.to_rgba8().into_raw(),
                );

                let thumbhash = general_purpose::STANDARD.encode(thumb_hash);

                thumbhashes
                    .lock()
                    .unwrap()
                    .insert(src, (thumbhash, image.width()));
            });

            (hash_handle, resize_handles)
        }))
    }

    for handle in handles {
        let (h, hs) = handle.join().unwrap();
        h.join().unwrap();
        for h in hs {
            h.join().unwrap();
        }
    }

    let thumbhashes = Arc::try_unwrap(thumbhashes).unwrap();

    thumbhashes.into_inner().unwrap()
}

#[tokio::main]
async fn main() -> std::io::Result<()> {
    let start_ = Instant::now();
    let root_template = fs::read_to_string("templates/root.html")?;

    let mut tt = TinyTemplate::new();
    tt.add_template("root", &root_template).unwrap();
    tt.add_formatter("markdown", |md, str| {
        let md = md.as_str().unwrap();
        let parser = pulldown_cmark::Parser::new(&md);
        pulldown_cmark::html::push_html(str, parser);
        Ok(())
    });

    let mut cards: Vec<_> = files_in_dir("./content/experiments")
        .iter()
        .map(|path| {
            let json = read_to_string(path).unwrap();
            serde_yaml::from_str(&json).unwrap()
        })
        .map(experiment_to_card)
        .chain(
            files_in_dir("./content/blog")
                .iter()
                .map(|filename| {
                    let content = read_to_string(filename).unwrap();
                    let (frontmatter, md) =
                        content.trim_start_matches("---").split_once("---").unwrap();

                    let name = filename_drop_ext(filename, ".md");

                    let metadata = BlogMetadata {
                        path: format!("/{}", name).into(),
                        ..serde_yaml::from_str(&frontmatter).unwrap()
                    };

                    let html = blogpost(metadata.clone(), md.into());
                    let html = &tt.render("root", &html).unwrap();

                    fs::create_dir(format!("./dist/{}", name.clone())).unwrap();
                    fs::write(format!("./dist/{}/index.html", name), &html).unwrap();

                    metadata
                })
                .filter(|blog| !blog.hidden)
                .map(blogpost_to_card),
        )
        .collect();
    println!("built blog posts in {}s", start_.elapsed().as_secs_f32());
    let start = Instant::now();

    cards.sort_by(|a, b| b.date.cmp(&a.date));

    cards.insert(
        0,
        Card {
            img_url: "/images/portrait.jpg".into(),
            img_alt: "Picture of me".into(),
            title: "Angus Findlay".into(),
            content: "Fullstack Engineer based in London.".into(),
            links_to: "https://github.com/angusjf/".into(),
            date: None,
            links: vec![
                Link {
                    href: "https://github.com/angusjf/".into(),
                    icon: "fab fa-github".into(),
                    label: "github/angusjf".into(),
                },
                Link {
                    href: "https://www.linkedin.com/in/angus-findlay/".into(),
                    icon: "fab fa-linkedin".into(),
                    label: "linkedin/angus-findlay".into(),
                },
                Link {
                    href: "https://webdev.london/".into(),
                    icon: "fas fa-comment".into(),
                    label: "webdev.london".into(),
                },
            ],
        },
    );
    let thumbhashes = process_images(&cards);
    println!("optimized images in {}s", start.elapsed().as_secs_f32());
    let start = Instant::now();

    {
        let thumbhashes = thumbhashes.clone();
        tt.add_formatter("thumbhash", move |img_url, str| {
            str.push_str(&thumbhashes[img_url.as_str().unwrap()].0);
            Ok(())
        });
    }

    let index = tt.render("root", &index(cards)).unwrap();

    println!("built root page in {}s", start.elapsed().as_secs_f32());
    let start = Instant::now();
    let index = optimize_assets(&index, thumbhashes);
    println!("optimized assets in {}s", start.elapsed().as_secs_f32());

    fs::write("dist/index.html", &*index).unwrap();

    println!(
        "{CANONICAL_ORIGIN} built in {}s",
        start_.elapsed().as_secs_f32()
    );
    Ok(())
}
