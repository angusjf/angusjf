use std::{
    fs::{self, read_to_string},
    io,
    path::PathBuf,
};

use chrono::NaiveDate;
use yaml_rust::{Yaml, YamlLoader};

const ROOT_TEMPLATE: &str = include_str!("../templates/root.html");
const BLOG_TEMPLATE: &str = include_str!("../templates/blog.html");
const INDEX_TEMPLATE: &str = include_str!("../templates/index.html");
const CARD_TEMPLATE: &str = include_str!("../templates/card.html");

#[derive(Debug)]
struct ExperimentMetadata<'a> {
    summary: &'a str,
    title: &'a str,
    date: NaiveDate,
    img_url: &'a str,
    img_alt: &'a str,
    urls: Vec<Link<'a>>,
}

#[derive(Debug)]
struct Link<'a> {
    url: &'a str,
    label: &'a str,
    icon: &'a str,
}

#[derive(Debug)]
struct BlogMetadata<'a> {
    title: &'a str,
    summary: &'a str,
    date: NaiveDate,
    img_url: &'a str,
    img_alt: &'a str,
    tags: Vec<&'a str>,
    hidden: bool,
    seo_description: &'a str,
}

struct Card<'a> {
    img_url: &'a str,
    title: &'a str,
    content: &'a str,
    links_to: Option<&'a str>,
    date: NaiveDate,
}

fn files_in_dir(dir: &str) -> Vec<PathBuf> {
    fs::read_dir(dir)
        .unwrap()
        .map(|res| res.map(|e| e.path()))
        .collect::<Result<Vec<_>, io::Error>>()
        .unwrap()
}

fn md_to_html(md: &str) -> String {
    let parser = pulldown_cmark::Parser::new(&md);
    let mut html_output = String::new();
    pulldown_cmark::html::push_html(&mut html_output, parser);
    html_output
}

fn blogpost(content: String) -> String {
    let body = BLOG_TEMPLATE.replace("{{content}}", content.as_str());
    ROOT_TEMPLATE.replace("{{body}}", &body)
}

fn index(cards: Vec<Card>) -> String {
    let mut body = String::new();

    cards.iter().for_each(|card| {
        body.push_str(&CARD_TEMPLATE.replace("{{title}}", card.title));
    });

    ROOT_TEMPLATE.replace("{{body}}", &body)
}

fn filename_drop_ext(path: &PathBuf, ext: &str) -> String {
    let filename = path.iter().last().unwrap().to_string_lossy();

    String::from(filename.strip_suffix(ext).unwrap())
}

fn yaml_to_blog(yaml: &Yaml) -> BlogMetadata {
    BlogMetadata {
        title: yaml["title"].as_str().unwrap(),
        summary: "todo!()",
        img_url: "todo!()",
        img_alt: "todo!()",
        tags: vec![],
        hidden: false,
        seo_description: "todo!()",
        date: "2020-11-11".parse().unwrap(),
    }
}

fn yaml_to_experiment<'a>(yaml: String) -> Box<ExperimentMetadata<'a>> {
    let yaml = &YamlLoader::load_from_str(&yaml).unwrap()[0];

    let summary = yaml["title"].as_str().expect("title");

    Box::new(ExperimentMetadata {
        summary,
        title: "",
        img_url: "",
        img_alt: "",
        urls: vec![],
        date: yaml["date"].as_str().expect("date").parse().unwrap(),
        // summary: yaml["summary"].as_str().unwrap(),
        // title: yaml["title"].as_str().unwrap(),
        // img_url: yaml["img_url"].as_str().unwrap(),
        // urls: yaml["urls"]
        //     .as_vec()
        //     .unwrap()
        //     .iter()
        //     .map(|url| Link {
        //         icon: url["icon"].as_str().unwrap(),
        //         label: url["label"].as_str().unwrap(),
        //         url: url["href"].as_str().unwrap(),
        //     })
        //     .collect(),
        // img_alt: yaml["img_alt"].as_str().unwrap(),
    })
}

fn main() -> std::io::Result<()> {
    let _ = std::fs::remove_dir_all("./dist");
    std::fs::create_dir("./dist")?;

    let experiments: Vec<_> = files_in_dir("./content/experiments")
        .iter()
        .map(|path| {
            let json = read_to_string(path).unwrap();

            yaml_to_experiment(json)
        })
        .collect();

    // let blogposts: Vec<_> = files_in_dir("./content/blog")
    //     .iter()
    //     .map(|filename| {
    //         let frontmatter_and_md = read_to_string(filename).unwrap();
    //         let name = filename_drop_ext(filename, ".md");

    //         let dir = format!("./dist/{}", name);

    //         let frontmatter_and_md: Vec<_> = frontmatter_and_md
    //             .trim_start_matches("---")
    //             .split("---")
    //             .collect();

    //         let frontmatter = frontmatter_and_md[0];
    //         let md = frontmatter_and_md[1];

    //         let content = md_to_html(&md);

    //         let frontmatter = YamlLoader::load_from_str(frontmatter).unwrap();

    //         (dir, yaml_to_blog(&frontmatter[0]), blogpost(content))
    //     })
    //     .collect();

    let blogposts: Vec<(String, BlogMetadata, String)> = vec![];

    blogposts.iter().for_each(|(dir, _, html_output)| {
        let _ = std::fs::create_dir(dir.clone());
        let _ = std::fs::write(format!("{}/index.html", dir), &html_output);
    });

    let experiments = experiments.iter().map(|experiment| Card {
        img_url: experiment.img_url,
        title: experiment.title,
        content: experiment.summary,
        links_to: None,
        date: experiment.date,
    });

    let blogposts = blogposts.iter().map(|(url, blogpost, _)| Card {
        img_url: blogpost.img_url,
        title: blogpost.title,
        content: blogpost.summary,
        links_to: Some(url.as_str()),
        date: blogpost.date,
    });

    let mut cards: Vec<Card> = experiments.chain(blogposts).collect();

    cards.sort_by_key(|card| card.date);

    let index_html = index(cards);

    let _ = std::fs::write("dist/index.html", &index_html);

    Ok(())
}
