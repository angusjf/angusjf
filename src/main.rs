#[macro_use]
extern crate serde_derive;
extern crate tinytemplate;

use base64::{engine::general_purpose, Engine as _};
use chrono::NaiveDate;
use image::imageops::FilterType;
use serde::{de, Deserializer, Serializer};
use serde_yaml;
use std::{
    fmt,
    fs::{self, read_to_string},
    io,
    path::PathBuf,
};
use thumbhash::rgba_to_thumb_hash;
use tinytemplate::TinyTemplate;

const TITLE: &str = "Angus Findlay";
const DESCRIPTION: &str = "Angus Findlay's Blog - angusjf";
const CANONICAL_URL: &str = "https://angusjf.com/";
const IMG: &str = "https://angusjf.com/images/plants.webp";

#[derive(Deserialize)]
struct ExperimentMetadata {
    summary: String,
    title: String,
    #[serde(deserialize_with = "deserialize_date")]
    date: NaiveDate,
    img_url: String,
    img_alt: String,
    urls: Vec<Link>,
}

#[derive(Clone, Deserialize)]
struct BlogMetadata {
    title: String,
    summary: String,
    #[serde(deserialize_with = "deserialize_date")]
    date: NaiveDate,
    img_url: String,
    img_alt: String,
    tags: Vec<String>,
    hidden: bool,
    seo_description: String,
    #[serde(default)]
    canonical_url: String,
}

#[derive(Serialize)]
struct Root {
    title: String,
    img_url: String,
    img_alt: String,
    canonical_url: String,
    description: String,
    index: Option<Index>,
    blog: Option<Blog>,
}

#[derive(Serialize)]
struct Index {
    cards: Vec<Card>,
}

#[derive(Serialize)]
struct Blog {
    content: String,
    #[serde(serialize_with = "serialize_date")]
    date: NaiveDate,
}

#[derive(Serialize)]
struct Card {
    img_url: String,
    img_alt: String,
    title: String,
    content: String,
    links_to: String,
    #[serde(serialize_with = "serialize_optional_date")]
    date: Option<NaiveDate>,
    links: Vec<Link>,
}

#[derive(Serialize, Deserialize)]
struct Link {
    href: String,
    label: String,
    icon: String,
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

fn filename_drop_ext(path: &PathBuf, ext: &str) -> String {
    path.iter()
        .last()
        .unwrap()
        .to_string_lossy()
        .strip_suffix(ext)
        .unwrap()
        .to_string()
}

/*
 * CARD CONVERTERS
 */
fn blogpost_to_card(blogpost: BlogMetadata) -> Card {
    Card {
        img_url: blogpost.img_url,
        title: blogpost.title,
        content: blogpost.summary,
        links_to: blogpost.canonical_url,
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
fn blogpost(metadata: BlogMetadata, content: String) -> Root {
    Root {
        img_url: metadata.img_url,
        img_alt: metadata.img_alt,
        canonical_url: metadata.canonical_url,
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
        img_url: IMG.to_string(),
        img_alt: TITLE.to_string(),
        canonical_url: CANONICAL_URL.to_string(),
        description: DESCRIPTION.to_string(),
        title: TITLE.to_string(),
        index: Some(Index { cards }),
        blog: None,
    }
}

fn main() -> std::io::Result<()> {
    let root_template = fs::read_to_string("templates/root.html")?;
    let mut tt = TinyTemplate::new();
    tt.add_template("root", &root_template).unwrap();
    tt.add_formatter("markdown", |md, str| {
        let md = md.as_str().unwrap();
        let parser = pulldown_cmark::Parser::new(&md);
        pulldown_cmark::html::push_html(str, parser);
        Ok(())
    });
    tt.add_formatter("thumbhash", |img_url, str| {
        let img_url = img_url.as_str().unwrap();
        println!("{:?}", img_url);
        let image = image::open("public/".to_string() + img_url).unwrap();
        let image = image.resize(100, 100, FilterType::Nearest);
        let rgba = image.to_rgba8();
        let thumb_hash = rgba_to_thumb_hash(
            rgba.width() as usize,
            rgba.height() as usize,
            &rgba.into_raw(),
        );
        let encoded_thumb_hash = general_purpose::STANDARD.encode(thumb_hash);
        str.push_str(&encoded_thumb_hash);
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
                        canonical_url: CANONICAL_URL.to_string() + &name,
                        ..serde_yaml::from_str(&frontmatter).unwrap()
                    };

                    let html = blogpost(metadata.clone(), md.to_string());
                    let html = &tt.render("root", &html).unwrap();

                    fs::create_dir(format!("./dist/{}", name.clone())).unwrap();
                    fs::write(format!("./dist/{}/index.html", name), &html).unwrap();

                    metadata
                })
                .filter(|blog| !blog.hidden)
                .map(blogpost_to_card),
        )
        .collect();

    cards.sort_by(|a, b| b.date.cmp(&a.date));

    cards.insert(
        0,
        Card {
            img_url: "/images/portrait.jpg".to_string(),
            img_alt: "Picture of me".to_string(),
            title: "Angus Findlay".to_string(),
            content: "Fullstack Engineer based in London.".to_string(),
            links_to: "https://github.com/angusjf/".to_string(),
            date: None,
            links: vec![
                Link {
                    href: "https://github.com/angusjf/".to_string(),
                    icon: "fab fa-github".to_string(),
                    label: "github/angusjf".to_string(),
                },
                Link {
                    href: "https://www.linkedin.com/in/angus-findlay/".to_string(),
                    icon: "fab fa-linkedin".to_string(),
                    label: "linkedin/angus-findlay".to_string(),
                },
                Link {
                    href: "https://webdev.london/".to_string(),
                    icon: "fas fa-comment".to_string(),
                    label: "webdev.london".to_string(),
                },
            ],
        },
    );

    fs::write(
        "dist/index.html",
        &tt.render("root", &index(cards)).unwrap(),
    )
    .unwrap();

    Ok(())
}
