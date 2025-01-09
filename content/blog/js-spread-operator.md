---
{
  "title": "On the Embarrassingly Poor Performance of JavaScript's Spread Operator",
  "img_url": "/images/sign.jpg",
  "img_alt": "No alt",
  "date": "2022-08-05",
  "seo_description": "On the Embarrassingly Poor Performance of JavaScript's Spread Operator",
  "summary": "On the Embarrassingly Poor Performance of JavaScript's Spread Operator",
  "tags": [ "javascript", "typescript", "performance" ],
  "hidden": true
}
---
# On the Embarrassingly Poor Performance of JavaScript's Spread Operator

Here is an example of immutable TypeScript code which is so inefficient it caused the lambda it was running on to time out.

Say we have a list of connections between airports:
```ts
const links = [ ['Heathrow', 'Paris'], ['Berlin', 'Brussels'] /* ... */ ];
```

And we want to format this data as a "dictionary", from airport to it's potential destinations:
```ts
{
    Heathrow: ['Paris', 'Berlin', 'Brussels'],
    Gatwick: [ /* ... */ ]
}
```

If we are strictly using immutable javascript, we end up with this:

```ts
const validDestinations = (links) =>
    links.reduce(
        (acc, [from, to]) =>
            ({ ...acc,
               [from]: [ ...(acc[from] ?? []), to ]
             }),
        {}
    )
```

_(I know the number of symbols in the above snippet will make any reader born before the year 2000 feel unwell & apologise in retrospect)_

The nested spread operator gives this code **cubic time complexity** and will generate an insane amount of "garbage" intermediate arrays.

This isn't some pedantic performance point, it's the difference between working code and timing out!
