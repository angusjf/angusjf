const name: &str = "demo";

fn main() -> std::io::Result<()> {
    // std::fs::remove_dir("./dist")?;
    // std::fs::create_dir("./dist")?;

    let blog = std::fs::read_to_string("./content/blog/14kb.md")?;
    let parser = pulldown_cmark::Parser::new(&blog);

    let mut html_output = String::new();
    pulldown_cmark::html::push_html(&mut html_output, parser);

    std::fs::write(format!("./dist/{}/index.html", name), html_output)?;

    Ok(())
}
