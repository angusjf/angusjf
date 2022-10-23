use std::{fs, io, path::PathBuf};

use chrono::NaiveDate;
use yaml_rust::{Yaml, YamlLoader};
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

fn files_in_dir(dir: &str) -> Vec<PathBuf> {
    fs::read_dir(dir)
        .unwrap()
        .map(|res| res.map(|e| e.path()))
        .collect::<Result<Vec<_>, io::Error>>()
        .unwrap()
}

fn filename_and_content(path: &PathBuf) -> (&PathBuf, String) {
    let content = std::fs::read_to_string(path).unwrap();
    (path, content)
}

fn md_to_html(md: &str) -> String {
    let parser = pulldown_cmark::Parser::new(&md);
    let mut html_output = String::new();
    pulldown_cmark::html::push_html(&mut html_output, parser);
    html_output
}

fn blogpost(content: String) -> String {
    content
}

fn filename_drop_ext(path: &PathBuf, ext: &str) -> String {
    let filename = path.iter().last().unwrap().to_string_lossy();

    String::from(filename.strip_suffix(ext).unwrap())
}

// fn yaml_to_blog(yaml: Yaml) -> BlogMetadata {
//     BlogMetadata {
//         date: yaml["date"].as_str().expect("date").parse(),
//     }
// }

fn yaml_to_experiment<'a>(yaml: &'a Yaml) -> Box<ExperimentMetadata<'a>> {
    Box::new(ExperimentMetadata {
        date: yaml["date"].as_str().expect("date").parse().unwrap(),
        summary: yaml["summary"].as_str().unwrap(),
        title: yaml["title"].as_str().unwrap(),
        img_url: yaml["img_url"].as_str().unwrap(),
        urls: yaml["urls"]
            .as_vec()
            .unwrap()
            .iter()
            .map(|url| Link {
                icon: url["icon"].as_str().unwrap(),
                label: url["label"].as_str().unwrap(),
                url: url["href"].as_str().unwrap(),
            })
            .collect(),
        img_alt: yaml["img_alt"].as_str().unwrap(),
    })
}

fn main() -> std::io::Result<()> {
    let _ = std::fs::remove_dir_all("./dist");
    std::fs::create_dir("./dist")?;

    let experiments: Vec<_> = files_in_dir("./content/experiments")
        .iter()
        .map(|path| filename_and_content(path))
        .map(|(filename, json)| {
            let filename = filename_drop_ext(filename, ".json");

            let json = YamlLoader::load_from_str(&json).unwrap();

            let x = yaml_to_experiment(&json[0]);

            println!("{:?}", x);
            (filename, "")
        })
        .collect();

    let blogposts: Vec<_> = files_in_dir("./content/blog")
        .iter()
        .map(|path| filename_and_content(path))
        .map(|(filename, frontmatter_and_md)| {
            let name = filename_drop_ext(filename, ".md");

            let dir = format!("./dist/{}", name);

            let frontmatter_and_md: Vec<_> = frontmatter_and_md
                .trim_start_matches("---")
                .split("---")
                .collect();

            let frontmatter = frontmatter_and_md[0];
            let md = frontmatter_and_md[1];

            let content = md_to_html(&md);

            let frontmatter = YamlLoader::load_from_str(frontmatter).unwrap();

            (dir, blogpost(content), frontmatter)
        })
        .collect();

    // blogposts.for_each(|(dir, html_output)| {
    //     let _ = std::fs::create_dir(dir.clone());
    //     let _ = std::fs::write(format!("{}/index.html", dir), &html_output);
    // });

    Ok(())
}

// frontmatterDecoder : Decoder BlogMetadata
// frontmatterDecoder =
//     D.map8
//         BlogMetadata
//         (D.field "title" D.string)
//         (D.field "summary" D.string)
//         (D.field "date" (D.andThen (resultToDecoder << Date.fromIsoString) D.string))
//         (D.field "img_url" D.string)
//         (D.field "img_alt" D.string)
//         (D.field "tags" (D.list D.string))
//         (D.field "hidden" D.bool)
//         (D.field "seo_description" D.string)

// jsonDecoder : Decoder ExperimentMetadata
// jsonDecoder =
//     D.map6 ExperimentMetadata
//         (D.field "summary" D.string)
//         (D.field "title" D.string)
//         (D.field "date" (D.andThen (resultToDecoder << Date.fromIsoString) D.string))
//         (D.field "img_url" D.string)
//         (D.field "img_alt" D.string)
//         (D.field "urls" (D.list urlDecoder))

// urlDecoder =
//     D.map3 Link
//         (D.field "href" D.string)
//         (D.field "label" D.string)
//         (D.field "icon" D.string)
