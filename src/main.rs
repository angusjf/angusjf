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

struct ExperimentMetadata {
    summary: String,
    title: String,
    date: NaiveDate,
    img_url: String,
    img_alt: String,
    urls: Vec<Link>,
}

struct Link {
    url: String,
    label: String,
    icon: String,
}

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

struct Card {
    img_url: String,
    img_alt: String,
    title: String,
    content: String,
    links_to: Option<String>,
    date: Option<NaiveDate>,
    links: Vec<Link>,
}

const DESCRIPTION: &str = "Angus Findlay's Blog - angusjf";
const CANONICAL_URL: &str = "https://angusjf.com/";

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
        .replace("{{title}}", &metadata.title)
        .replace("{{extra_meta_tags}}", &blog_meta_tags(metadata))
        .replace("{{description}}", &metadata.seo_description)
        .replace("{{canonical_url}}", &metadata.canonical_url)
}

fn index(cards: Vec<Card>) -> String {
    let mut content = String::new();

    cards.iter().for_each(|card| {
        content.push_str(
            &CARD_TEMPLATE
                .replace(
                    "{{title}}",
                    &match &card.links_to {
                        Some(href) => {
                            format!("<a href=\"{}\">{}</a>", &href, &card.title.clone())
                        }
                        None => card.title.clone(),
                    },
                )
                .replace("{{img_alt}}", &card.img_alt)
                .replace("{{img_src}}", &card.img_url)
                .replace("{{summary}}", &md_to_html(&card.content))
                .replace("{{links}}", {
                    let links = &card
                        .links
                        .iter()
                        .map(|link| {
                            format!(
                                "<li><i class=\"{}\"></i><a href=\"{}\">{}</a></li>",
                                link.icon, link.url, link.label
                            )
                        })
                        .collect::<String>();
                    &if links.len() > 0 {
                        format!("<ul>{}</ul>", &links).to_string()
                    } else {
                        "".to_string()
                    }
                })
                .replace(
                    "{{href}}",
                    &card.links_to.as_ref().unwrap_or(&"".to_string()),
                )
                .replace(
                    "{{date}}",
                    &match &card.date {
                        Some(date) => {
                            let date = date.format("%-d %b '%y").to_string();
                            format!("<date>{}</date>", date)
                        }
                        None => "".to_string(),
                    },
                ),
        );
    });

    let body = INDEX_TEMPLATE.replace("{{content}}", &content);

    ROOT_TEMPLATE
        .replace("{{body}}", &body)
        .replace("{{title}}", "Angus Findlay")
        .replace("{{extra_meta_tags}}", &index_meta_tags())
        .replace("{{description}}", DESCRIPTION)
        .replace("{{canonical_url}}", CANONICAL_URL)
}

fn meta_tag<'a>((property, content): &(&str, &str)) -> String {
    format!("<meta name=\"{}\" property=\"{}\" />", property, content)
}

const IMG: &str = "images/plants.webp";

fn index_meta_tags<'a>() -> String {
    [
        ("og:image", IMG),
        ("og:image:secure_url", "https://angusjf.com/plants.webp"),
        ("og:image:alt", "Angus Findlay"),
        ("og:title", "Angus Findlay's Blog - angusjf"),
        ("og:url", "https://angusjf.com/"),
        ("og:description", DESCRIPTION),
        ("og:site_name", "Angus Findlay"),
        ("og:locale", "en_GB"),
        ("og:type", "website"),
        ("twitter:card", "summary"),
        ("twitter:title", "Angus Findlay's Blog - angusjf"),
        ("twitter:description", DESCRIPTION),
        ("twitter:image", IMG),
        ("twitter:image:alt", "Angus Findlay"),
    ]
    .iter()
    .map(meta_tag)
    .collect::<String>()
}

fn blog_meta_tags(metadata: &BlogMetadata) -> String {
    [
        ("og:image", "https://angusjf.com/images/elm.webp"),
        ("og:image:secure_url", &metadata.img_url),
        ("og:image:alt", &metadata.img_alt),
        ("og:title", &metadata.title),
        ("og:url", &metadata.canonical_url),
        ("og:description", &metadata.seo_description),
        ("og:site_name", "Angus Findlay"),
        ("og:type", "article"),
        ("twitter:card", "summary"),
        ("twitter:title", &metadata.img_url),
        ("twitter:description", &metadata.seo_description),
        ("twitter:image", &metadata.img_url),
        ("twitter:image:alt", &metadata.img_alt),
        ("article:published_time", &metadata.date.to_string()),
    ]
    .iter()
    .map(meta_tag)
    .chain(
        metadata
            .tags
            .iter()
            .map(|tag| meta_tag(&("article:tag", tag.as_str()))),
    )
    .collect::<String>()
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

fn parse_md(str: String) -> (Yaml, String) {
    let frontmatter_and_md: Vec<_> = str.trim_start_matches("---").split("---").collect();

    let frontmatter = frontmatter_and_md[0];
    let md = frontmatter_and_md[1];

    let frontmatter = YamlLoader::load_from_str(frontmatter).unwrap();

    (frontmatter[0].clone(), md_to_html(&md))
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
            img_url: experiment.img_url,
            title: experiment.title,
            content: experiment.summary,
            links_to: None,
            date: Some(experiment.date),
            img_alt: experiment.img_alt,
            links: experiment.urls,
        })
        .chain(
            files_in_dir("./content/blog")
                .iter()
                .map(|filename| {
                    let (frontmatter, md) = parse_md(read_to_string(filename).unwrap());

                    let name = filename_drop_ext(filename, ".md");

                    let metadata = yaml_to_blog(name.clone(), &frontmatter);
                    let html = blogpost(&metadata, md);

                    let _ = std::fs::create_dir(format!("./dist/{}", name.clone()));
                    println!("./dist/{}/index.html", name);
                    let _ = std::fs::write(format!("./dist/{}/index.html", name), &html);

                    metadata
                })
                .filter(|blog| !blog.hidden)
                .map(|blogpost| Card {
                    img_url: blogpost.img_url,
                    title: blogpost.title,
                    content: blogpost.summary,
                    links_to: Some(blogpost.canonical_url),
                    date: Some(blogpost.date),
                    img_alt: blogpost.img_alt,
                    links: vec![],
                }),
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

    let _ = std::fs::write("dist/index.html", &index(cards));

    Ok(())
}
