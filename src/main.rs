use chrono::NaiveDate;
use std::{
    fs::{self, read_to_string},
    io,
    path::PathBuf,
};
use yaml_rust::{Yaml, YamlLoader};

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

fn files_in_dir(dir: &str) -> Vec<PathBuf> {
    fs::read_dir(dir)
        .unwrap()
        .map(|res| res.map(|e| e.path()))
        // .filter(|path| path.as_ref().map_or(true, |x| !x.starts_with(".")))
        .collect::<Result<Vec<_>, io::Error>>()
        .unwrap()
}

fn md_to_html(md: &str) -> String {
    let parser = pulldown_cmark::Parser::new(&md);
    let mut html_output = String::new();
    pulldown_cmark::html::push_html(&mut html_output, parser);
    html_output
}

fn blogpost(
    blog_template: &str,
    root_template: &str,
    metadata: &BlogMetadata,
    content: String,
) -> String {
    let body = blog_template.replace("{{content}}", content.as_str());
    root_template
        .replace("{{body}}", &body)
        .replace("{{title}}", &metadata.title)
        .replace("{{extra_meta_tags}}", &blog_meta_tags(metadata))
        .replace("{{description}}", &metadata.seo_description)
        .replace("{{canonical_url}}", &metadata.canonical_url)
}

fn index(
    card_template: &str,
    index_template: &str,
    root_template: &str,
    cards: Vec<Card>,
) -> String {
    let mut content = String::new();

    cards.iter().for_each(|card| {
        content.push_str(
            &card_template
                .replace(
                    "{{title}}",
                    &match &card.links_to {
                        Some(href) => {
                            format!("<a href=\"{}\">{}</a>", &href, &card.title.clone())
                        }
                        None => {
                            format!("<a href=\"{}\">{}</a>", &card.links[0].url, &card.title.clone())
                        }
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

    let body = index_template.replace("{{content}}", &content);

    root_template
        .replace("{{body}}", &body)
        .replace("{{title}}", "Angus Findlay")
        .replace("{{extra_meta_tags}}", &index_meta_tags())
        .replace("{{description}}", DESCRIPTION)
        .replace("{{canonical_url}}", CANONICAL_URL)
}

fn meta_tag((property, content): &(&str, &str)) -> String {
    format!("<meta name=\"{}\" content=\"{}\" />", property, content)
}

fn index_meta_tags() -> String {
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
        ("og:site_name", "Angus Findlay"),
        ("og:image", &metadata.img_url),
        ("og:image:secure_url", &metadata.img_url),
        ("og:image:alt", &metadata.img_alt),
        ("og:title", &metadata.title),
        ("og:url", &metadata.canonical_url),
        ("og:description", &metadata.seo_description),
        ("og:type", "article"),
        ("twitter:card", "summary"),
        ("twitter:title", &metadata.title),
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
    let (frontmatter, md) = str.trim_start_matches("---").split_once("---").unwrap();

    let frontmatter = YamlLoader::load_from_str(frontmatter).unwrap();

    (frontmatter[0].clone(), md_to_html(&md))
}

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

fn main() -> std::io::Result<()> {
    let root_template = fs::read_to_string("templates/root.html")?;
    let blog_template = fs::read_to_string("templates/blog.html")?;
    let index_template = fs::read_to_string("templates/index.html")?;
    let card_template = fs::read_to_string("templates/card.html")?;

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

                    let html = blogpost(&blog_template, &root_template, &metadata, md);

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

    std::fs::write(
        "dist/index.html",
        &index(&card_template, &index_template, &root_template, cards),
    )
    .unwrap();

    Ok(())
}
