use std::{collections::HashMap, path::Path, sync::Arc};

use deno_core::{futures::executor::block_on, url::Url};
use deno_emit::{BundleOptions, CacheSetting, EmitOptions};
use reqwest::StatusCode;

pub(crate) fn bundle(path: &Path) -> String {
    let mut loader = Loader {};
    block_on(async {
        deno_emit::bundle(
            Url::from_file_path(path.canonicalize().unwrap()).unwrap(),
            &mut loader,
            None,
            BundleOptions {
                bundle_type: deno_emit::BundleType::Module,
                emit_ignore_directives: false,
                emit_options: EmitOptions {
                    inline_source_map: false,
                    ..Default::default()
                },
            },
        )
        .await
    })
    .unwrap()
    .code
}

struct Loader;

impl deno_graph::source::Loader for Loader {
    fn load(
        &mut self,
        specifier: &deno_graph::ModuleSpecifier,
        _is_dynamic: bool,
        _cache_setting: CacheSetting,
    ) -> deno_graph::source::LoadFuture {
        let specifier = specifier.clone();

        Box::pin(async move {
            match specifier.scheme() {
                "data" => deno_graph::source::load_data_url(&specifier),
                "file" => {
                    let path = std::fs::canonicalize(specifier.to_file_path().unwrap())?;
                    let content = std::fs::read_to_string(&path)?;
                    Ok(Some(deno_graph::source::LoadResponse::Module {
                        specifier: Url::from_file_path(&path).unwrap(),
                        maybe_headers: None,
                        content: Arc::from(content),
                    }))
                }
                "http" | "https" => {
                    let resp = reqwest::get(specifier.as_str()).await?;
                    if resp.status() == StatusCode::NOT_FOUND {
                        Ok(None)
                    } else {
                        let resp = resp.error_for_status()?;
                        let mut headers = HashMap::new();
                        for key in resp.headers().keys() {
                            let key_str = key.to_string();
                            let values = resp.headers().get_all(key);
                            let values_str = values
                                .iter()
                                .filter_map(|e| e.to_str().ok())
                                .collect::<Vec<&str>>()
                                .join(",");
                            headers.insert(key_str, values_str);
                        }
                        let url = resp.url().clone();
                        let content = resp.text().await?;
                        Ok(Some(deno_graph::source::LoadResponse::Module {
                            specifier: url,
                            maybe_headers: Some(headers),
                            content: Arc::from(content),
                        }))
                    }
                }
                scheme => panic!("unsupported scheme: {scheme}"),
            }
        })
    }
}
