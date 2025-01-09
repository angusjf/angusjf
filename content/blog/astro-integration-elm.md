---
{
  "title": "Introducing the Elm integration for Astro",
  "img_url": "/images/elm_astro.webp",
  "img_alt": "The Elm logo and the Astro logo",
  "date": "2022-12-05",
  "seo_description": "A new integration for server side rendered, hydrated Elm island components in your Astro project.",
  "summary": "A new integration for server side rendered, hydrated Elm island components in your Astro project.",
  "tags": [ "elm", "web", "performance", "ssr", "astro", "javascript" ],
  "hidden": false
}
---

![Astro logo coloured blue](/images/astro_elm_long.webp)

# Introducing the Elm integration for Astro

Astro is a hot new framework for building static sites, which uses a style of "server side rendering" with hydration, dubbed *The Islands Architecture*.

After looking at the integrations page for Astro, I was disappointed to see nobody had made an Elm one yet. So here it is!

[angusjf/astro-integration-elm](https://github.com/angusjf/astro-integration-elm)

It's in early stage development so please report any bugs or trouble installing over on the github issues page.

## What it's good for, and what it isn't

To contrast `astro-integration-elm` with [Elm Pages](https://elm-pages.com) (of which I am a huge fan), I'd say the following:

- If you want to handle as much data in Elm as possible, and avoid JS entirely, use **Elm Pages**
- If you have multiple pages use **Elm Pages**
- If you need server side rendering now, use `astro-integration-elm` (although this is coming in Elm Pages 2)
- If you want to mix and match frameworks use `astro-integration-elm`
- If you want to server-side (request time) render on an edge runtime that doesn't support node, such as Cloudflare Pages' Edge Runtime, neither option will work.

That is to say `astro-integration-elm` is good for what you could call *microfrontends* written in Elm, which, like all architectures, have benefits and tradeoffs.

For more information, the project is available on [Github](https://github.com/angusjf/astro-integration-elm).

### References:

- [Astro Islands](https://docs.astro.build/en/concepts/islands/)
- [Elm Pages](https://elm-pages.com)
