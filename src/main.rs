#[path = "js.rs"]
mod js;
use base64::{engine::general_purpose, Engine};
use lol_html::{element, HtmlRewriter, Settings};
use std::io;
use std::io::prelude::*;
use std::{
    env,
    fs::{self, File},
    path::Path,
};
use thumbhash::rgba_to_thumb_hash;

const ROOT_IMG_RENDERED_SIZE: u32 = 244;
const SRCSET_RESOLUTIONS: [u32; 2] = [1, 2];

fn process_image(path: &str) -> (String, u32) {
    let filter = if env::args().any(|flag| flag == "--quick-img") {
        image::imageops::FilterType::Nearest
    } else {
        image::imageops::FilterType::Lanczos3
    };

    let image = image::open(&*path).unwrap();

    [1, 2].map(|pixel_ratio| {
        let image = image.clone();
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
    });
    let thumb = image.thumbnail(100, 100);
    let thumb_hash = rgba_to_thumb_hash(
        thumb.width() as usize,
        thumb.height() as usize,
        &thumb.to_rgba8().into_raw(),
    );

    let thumbhash = general_purpose::STANDARD.encode(thumb_hash);

    (thumbhash, image.width())
}

fn main() {
    let stdin = io::stdin();
    let mut stdout = io::stdout();

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
                element!("i[class]", |el| {
                    let class = el.get_attribute("class").unwrap();
                    let split: Vec<_> = class.split(" ").collect();

                    let category = match split[0] {
                        "fas" => "solid",
                        "fab" => "brands",
                        _ => unreachable!(),
                    };

                    let name = split[1].trim_start_matches("fa-");

                    let path = format!("svgs/{category}/{name}.svg");

                    let svg = fs::read_to_string(path).unwrap();

                    let content = svg; //format!("");

                    el.replace(&content, lol_html::html_content::ContentType::Html);

                    Ok(())
                }),
                element!("img[src^='/']", |el| {
                    let src = el.get_attribute("src").unwrap();
                    let src = src.as_str();

                    let (thumbhash, image_width) = &process_image(src);

                    let true_scale: f32 = *image_width as f32 / ROOT_IMG_RENDERED_SIZE as f32;

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

                    el.set_attribute("data-thumbhash", thumbhash).unwrap();

                    Ok(())
                }),
            ],
            ..Settings::default()
        },
        |c: &[u8]| stdout.write_all(c).unwrap(),
    );

    loop {
        let mut stdin = stdin.lock();
        let buffer = stdin.fill_buf().unwrap();
        let len = buffer.len();

        if len > 0 {
            rewriter.write(buffer).unwrap();
            stdin.consume(len);
        } else {
            rewriter.end().unwrap();
            break;
        }
    }
}
