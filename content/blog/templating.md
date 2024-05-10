---
title: Templating & Power
img_url: /images/django.jpg
img_alt: Zoomed in Django template code
date: "2024-01-07"
seo_description: "Evaluating different approaches to templating for the web"
summary: "Reflecting on different ways of rendering HTML pages"
tags: ["web"]
hidden: false
---

# Templating & Power

I recently read [I made JSX for Lua (because I hate static sites)](https://bvisness.me/luax/). It outlines a JSX-like syntax: "templates" are essentially functions that return HTML as a string, calling other components in the process. I think Ben's site is great and he has a really nice approach. However, I feel it does come with some downsides.

I have had experience with this style, which is already a feature of Elixir's Phoenix framework called _[HEEx](https://hexdocs.pm/phoenix_live_view/assigns-eex.html)_. Here's a snippet:

```elixir
def my_component(assigns) do
  ~H"""
  <div class={@bg_color}>
    <.example />
  </div>
  """
end

def example(_assigns) do
  ~H"""
  <b>hello world</b>
  """
end
```

While some languages have functionality for this built in, almost any language can implement something similar (albeit less fancy). Think of your page as components, and model them as functions that return strings & call other components. Seems complexity free - and it's definitely far less complex than building UIs procedurally.

The alternative to this is a templating language like Handlebars or Liquid. Here's a sample of Liquid:

```liquid
{% if user %}
  Hello {{ user.name }}!
{% endif %}
```

## What makes dumb templates better than functions?

The difference in these two approaches is that templates are far more restrictive. You can't call your database in a .liquid file. They aren't Turing complete and there's no way to interact with your program from within them (unless you count custom filters like `created_at | datetime`, which should strictly be pure string to string functions).

I think this is really nice, natural way to structure your code. The data you pass into a template is ready for rendering, save for the formatting of it. Templates then do only one thing. This seems like a small thing, but answering the question "where should this go?" is much of the pain involved for a team working on a project.

The [Principle of Least Power](https://www.w3.org/DesignIssues/Principles.html) says we should choose the least powerful tool for the job. I don't see how the slight ergonomic benefits of function-templates can outweigh this.

You can statically analyze dumb-templates easily, you can make guarantees about how quickly they will render, you can cache the rendered result without fear, and you can port them from one system or programming language to another.

You can imagine a system of "function-style" document-building taken to the extreme, where the HTTP request headers are checked in the components that render the footer of the website. This is a mess! Fighting complexity is all about knowing when to give up power to save your future self.
