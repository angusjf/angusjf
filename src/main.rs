use std::{
    fs::{self, read_to_string},
    io,
    path::PathBuf,
};

use chrono::NaiveDate;
use fs_extra::copy_items;
use yaml_rust::{Yaml, YamlLoader};

const ROOT_TEMPLATE: &str = include_str!("../templates/root.html");
const BLOG_TEMPLATE: &str = include_str!("../templates/blog.html");
const INDEX_TEMPLATE: &str = include_str!("../templates/index.html");
const CARD_TEMPLATE: &str = include_str!("../templates/card.html");

#[derive(Debug)]
struct ExperimentMetadata {
    summary: String,
    title: String,
    date: NaiveDate,
    img_url: String,
    img_alt: String,
    urls: Vec<Link>,
}

#[derive(Debug)]
struct Link {
    url: String,
    label: String,
    icon: String,
}

#[derive(Debug)]
struct BlogMetadata {
    title: String,
    summary: String,
    date: NaiveDate,
    img_url: String,
    img_alt: String,
    tags: Vec<String>,
    hidden: bool,
    seo_description: String,
}

struct Card {
    img_url: String,
    img_alt: String,
    title: String,
    content: String,
    links_to: Option<String>,
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

fn blogpost(metadata: &BlogMetadata, content: String) -> String {
    let body = BLOG_TEMPLATE.replace("{{content}}", content.as_str());
    ROOT_TEMPLATE
        .replace("{{body}}", &body)
        .replace("{{title}}", "X")
}

fn index(cards: Vec<Card>) -> String {
    let mut content = String::new();

    cards.iter().for_each(|card| {
        content.push_str(
            &CARD_TEMPLATE
                .replace("{{title}}", &card.title)
                .replace("{{img_alt}}", &card.img_alt)
                .replace("{{img_src}}", &card.img_url)
                .replace("{{summary}}", &card.content)
                .replace(
                    "{{href}}",
                    &card.links_to.as_ref().unwrap_or(&String::from("")),
                )
                .replace("{{date}}", &card.date.to_string()),
        );
    });

    let body = INDEX_TEMPLATE.replace("{{content}}", &content);

    ROOT_TEMPLATE
        .replace("{{body}}", &body)
        .replace("{{title}}", "Angus Findlay")
}

fn filename_drop_ext(path: &PathBuf, ext: &str) -> String {
    let filename = path.iter().last().unwrap().to_string_lossy();

    String::from(filename.strip_suffix(ext).unwrap())
}

fn yaml_to_blog(yaml: &Yaml) -> BlogMetadata {
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

fn parse_md_and_frontmatter(str: String) -> (Yaml, String) {
    let frontmatter_and_md: Vec<_> = str.trim_start_matches("---").split("---").collect();

    let frontmatter = frontmatter_and_md[0];
    let md = frontmatter_and_md[1];

    let content = md_to_html(&md);

    let frontmatter = YamlLoader::load_from_str(frontmatter).unwrap();

    (frontmatter[0], md.to_string())
}

fn main() -> std::io::Result<()> {
    {
        let _ = std::fs::remove_dir_all("./dist");
        std::fs::create_dir("./dist")?;
    }

    {
        let mut options = fs_extra::dir::CopyOptions::new();
        options.overwrite = true;
        options.copy_inside = true;
        copy_items(files_in_dir("./public").as_slice(), "./dist/", &options).unwrap();
    }

    let mut cards: Vec<_> = files_in_dir("./content/experiments")
        .iter()
        .map(|path| {
            let json = read_to_string(path).unwrap();
            yaml_to_experiment(json)
        })
        .map(|experiment| Card {
            img_url: experiment.img_url.clone(),
            title: experiment.title.clone(),
            content: experiment.summary.clone(),
            links_to: None,
            date: experiment.date,
            img_alt: experiment.img_alt.clone(),
        })
        .chain(
            files_in_dir("./content/blog")
                .iter()
                .map(|filename| {
                    let (frontmatter, md) =
                        parse_md_and_frontmatter(read_to_string(filename).unwrap());

                    let metadata = yaml_to_blog(&frontmatter[0]);

                    let html = blogpost(&metadata, md);

                    (filename, metadata, html)
                })
                .filter(|(_, blog, _)| !blog.hidden)
                .map(|(filename, metadata, html_output)| {
                    let name = filename_drop_ext(filename, ".md");
                    let dir = format!("./dist/{}", name);
                    let _ = std::fs::create_dir(dir.clone());
                    let _ = std::fs::write(format!("{}/index.html", dir), &html_output);
                    (dir, metadata, html_output)
                })
                .map(|(url, blogpost, _)| Card {
                    img_url: blogpost.img_url.clone(),
                    title: blogpost.title.clone(),
                    content: blogpost.summary.clone(),
                    links_to: Some(url.to_string()),
                    date: blogpost.date,
                    img_alt: blogpost.img_alt.clone(),
                }),
        )
        .collect();

    cards.sort_by(|a, b| b.date.cmp(&a.date));

    cards.insert(
        0,
        Card {
            img_url: String::from("/images/portrait.jpg"),
            img_alt: String::from("Picture of me"),
            title: String::from("Angus Findlay"),
            content: String::from("Fullstack Engineer based in London!"),
            links_to: None,
            date: NaiveDate::MAX,
        },
    );

    let _ = std::fs::write("dist/index.html", &index(cards));

    Ok(())
}
