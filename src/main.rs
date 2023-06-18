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
const CANONICAL_ORIGIN: &str = "https://angusjf.com";
const IMG: &str = "/images/plants.webp";

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

fn filename_drop_ext(path: &PathBuf, ext: &str) -> Box<str> {
    path.iter()
        .last()
        .unwrap()
        .to_string_lossy()
        .strip_suffix(ext)
        .unwrap()
        .into()
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

fn get_encoded_thumbhash(img_url: &str) -> Box<str> {
    let image = image::open(img_url).unwrap();
    let image = image.resize(100, 100, FilterType::Nearest);
    let thumb_hash = rgba_to_thumb_hash(
        image.width() as usize,
        image.height() as usize,
        &image.to_rgba8().into_raw(),
    );
    general_purpose::STANDARD.encode(thumb_hash).into()
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
        let img_url = "public/".to_string() + img_url.as_str().unwrap();
        str.push_str(&get_encoded_thumbhash(&img_url));
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

    fs::write(
        "dist/index.html",
        &tt.render("root", &index(cards)).unwrap(),
    )
    .unwrap();

    Ok(())
}
