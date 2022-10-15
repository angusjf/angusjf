---
title: "Expiring Feature Flags"
img_url: images/junk.png
img_alt: River of Junk
date: "2022-10-15"
seo_description: ""
summary: "Keeping feature flags under control one tiny eslint plugin."
tags: ["eslint", "js", "maintainability"]
hidden: false
---

![Jake Cleaning up the desk in Adventure Time](/images/cleaning.gif)

# Expiring Feature Flags

As a developer who does a lot of tiny content changes, I think feature flags are a great idea.

As a quick example, imagine you need to add some copy to your website:

```html
<p>We are reuglated by the Financial Conduct Authority [FRN: 580101]</p>
```

**BUT WAIT!** You haven't actually got your FCA approval yet, so you can't publish this or you'll get in **massive trouble**.

Thankfully you've set up a feature flag service:

```js
const showFcaNumber = useFlag('show-fca-number');

if (showFcaNumber) {
    return <p>We are reuglated by the Financial Conduct Authority [FRN: 580101]</p>
} else {
    return <p>We are not regulated yet...</p>
}
```

Problem solved!

However, in a few months this flag will be enabled forever and that 'else branch' will become dead code. How will we remember to remove it?

```js
// TODO: Remove flag and else branch when we get regulated
```

We all know that comment is **never** getting removed... It's common knowledge that most TODO comments are never followed up on. Are we doomed to forever pile on more and more **bloat** into our codebase?

The solution is [expiring-todo-comments](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/expiring-todo-comments.md), an ingenious eslint rule to **stop your CI** passing when you leave TODOs in too long.

```js
// TODO [2023-11-28]: Remove flag and else branch when we get regulated
```

Problem solved!
