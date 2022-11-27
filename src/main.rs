#[macro_use]
extern crate serde_derive;
extern crate tinytemplate;

use serde::Serializer;
use chrono::NaiveDate;
use std::{
    fs::{self, read_to_string},
    io,
    path::PathBuf,
};
use yaml_rust::{Yaml, YamlLoader};
use tinytemplate::TinyTemplate;

const TITLE: &str = "Angus Findlay";
const DESCRIPTION: &str = "Angus Findlay's Blog - angusjf";
const CANONICAL_URL: &str = "https://angusjf.com/";
const IMG: &str = "https://angusjf.com/images/plants.webp";

struct ExperimentMetadata {
    summary: String,
    title: String,
    date: NaiveDate,
    img_url: String,
    img_alt: String,
    urls: Vec<Link>,
}

#[derive(Clone)]
struct BlogMetadata {
    title: String,
    summary: String,
    date: NaiveDate,
    img_url: String,
    img_alt: String,
    tags: Vec<String>,
    hidden: bool,
    seo_description: String,
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
    links_to: Option<String>,
    #[serde(serialize_with = "serialize_optional_date")]
    date: Option<NaiveDate>,
    links: Vec<Link>,
}

#[derive(Serialize)]
struct Link {
    url: String,
    label: String,
    icon: String,
}


pub fn serialize_optional_date<S>( date: &Option<NaiveDate>, s: S) -> Result<S::Ok, S::Error> where S: Serializer {
    match date {
        Some(date) => serialize_date(date, s),
        _ => s.serialize_none(),
    }
}

pub fn serialize_date<S>( date: &NaiveDate, s: S) -> Result<S::Ok, S::Error> where S: Serializer {
    s.serialize_str(&date.format("%-d %b '%y").to_string())
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
 *
 * PARSERS
 *
 */
fn yaml_to_blog(url: String, yaml: &Yaml) -> BlogMetadata {
    BlogMetadata {
        title: yaml["title"].as_str().unwrap().to_string(),
        summary: yaml["summary"].as_str().unwrap().to_string(),
        img_url: yaml["img_url"].as_str().unwrap().to_string(),
        img_alt: yaml["img_alt"].as_str().unwrap().to_string(),
        tags: yaml["tags"]
            .as_vec()
            .unwrap()
            .iter()
            .map(|x| x.as_str().unwrap().to_string())
            .collect(),
        hidden: yaml["hidden"].as_bool().unwrap(),
        seo_description: yaml["seo_description"].as_str().unwrap().to_string(),
        date: yaml["date"].as_str().unwrap().parse().unwrap(),
        canonical_url: url,
    }
}

fn yaml_to_experiment(yaml: String) -> ExperimentMetadata {
    let yaml = &YamlLoader::load_from_str(&yaml).unwrap()[0];

    ExperimentMetadata {
        summary: yaml["summary"].as_str().expect("title").to_string(),
        title: yaml["title"].as_str().expect("title").to_string(),
        img_url: yaml["img_url"].as_str().expect("title").to_string(),
        img_alt: yaml["img_alt"].as_str().expect("title").to_string(),
        date: yaml["date"].as_str().expect("date").parse().unwrap(),
        urls: yaml["urls"]
            .as_vec()
            .unwrap()
            .iter()
            .map(|url| Link {
                icon: url["icon"].as_str().unwrap().to_string(),
                label: url["label"].as_str().unwrap().to_string(),
                url: url["href"].as_str().unwrap().to_string(),
            })
            .collect(),
    }
}

/* 
 *
 * CARD CONVERTERS
 *
 */
fn blogpost_to_card(blogpost: BlogMetadata) -> Card {
    Card {
        img_url: blogpost.img_url,
        title: blogpost.title,
        content: blogpost.summary,
        links_to: Some(blogpost.canonical_url),
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
        links_to: None,
        date: Some(experiment.date),
        img_alt: experiment.img_alt,
        links: experiment.urls,
    }
}

/*
 *
 * RENDERERS
 *
 */
fn blogpost(
    metadata: BlogMetadata,
    content: String,
) -> Root {
    Root {
        img_url: metadata.img_url,
        img_alt: metadata.img_alt,
        canonical_url: metadata.canonical_url, // TODO Wrong?
        description: metadata.seo_description,
        title: metadata.title,
        index: None,
        blog: Some(Blog { content, date: metadata.date }),
    }
}

fn index(
    cards: Vec<Card>,
) -> Root {
    Root {
        img_url: IMG.to_string(),
        img_alt: TITLE.to_string(),
        canonical_url: CANONICAL_URL.to_string(),
        description: DESCRIPTION.to_string(),
        title: TITLE.to_string(),
        index : Some(Index { cards }),
        blog : None,
    }
}

fn parse_md(str: String) -> (Yaml, String) {
    let (frontmatter, md) = str.trim_start_matches("---").split_once("---").unwrap();

    let frontmatter = YamlLoader::load_from_str(frontmatter).unwrap();

    (frontmatter[0].clone(), md.to_string())
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

    let mut cards: Vec<_> = files_in_dir("./content/experiments")
        .iter()
        .map(|path| {
            let json = read_to_string(path).unwrap();
            yaml_to_experiment(json)
        })
        .map(experiment_to_card)
        .chain(
            files_in_dir("./content/blog")
                .iter()
                .map(|filename| {
                    let (frontmatter, md) = parse_md(read_to_string(filename).unwrap());

                    let name = filename_drop_ext(filename, ".md");

                    let metadata = yaml_to_blog(name.clone(), &frontmatter);

                    let html = blogpost(metadata.clone(), md);
                    let html = &tt.render("root", &html).unwrap();

                    std::fs::create_dir(format!("./dist/{}", name.clone())).unwrap();
                    std::fs::write(format!("./dist/{}/index.html", name), &html).unwrap();

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
            content: "Fullstack Engineer based in London!".to_string(),
            links_to: None,
            date: None,
            links: vec![
                Link {
                    url: "https://github.com/angusjf/".to_string(),
                    icon: "fab fa-github".to_string(),
                    label: "github/angusjf".to_string(),
                },
                Link {
                    url: "https://www.linkedin.com/in/angus-findlay/".to_string(),
                    icon: "fab fa-linkedin".to_string(),
                    label: "linkedin/angus-findlay".to_string(),
                },
                Link {
                    url: "https://webdev.london/".to_string(),
                    icon: "fas fa-comment".to_string(),
                    label: "webdev.london".to_string(),
                },
            ],
        },
    );

    std::fs::write("dist/index.html", &tt.render("root", &index(cards)).unwrap()).unwrap();

    Ok(())
}
