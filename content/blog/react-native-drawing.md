---
title: "Drawing with React Native"
img_url: /images/drawings.webp
img_alt: "some drawings from five-seven-five"
date: "2023-03-12"
seo_description: "Creating a touch/drawing input in React Native with Expo"
summary: "Creating a touchscreen drawing input from scratch in less than 100 lines of code"
tags: ["react"]
hidden: false
---

# Drawing with React Native

![some drawings from five-seven-five](https://angusjf.com/images/drawings.webp)

I've been working on [575](https://www.github.com/angusjf/575) *(the app for the next generation of Haiku poets)* for the last few months – it's my pride and joy. As a team, we love to experiment with light-hearted and non-traditional features that bring a lot of fun to the app. 

One such feature is the ability to add your signature to the haikus you post. Think of it as an alternative to a username or profile picture - a bit a of throwback to the Pictochats of the Nintendo DS days.

But how would you implement this in *React Native*, our app framework of choice? The answer is to use `PanResponder`.

## Code Walkthrough

We will represent a "drawing" as a list of lines, and in turn represent a line as a list of points. A point is just an x and y coordinate:
```tsx
export type Point = {
  x: number;
  y: number;
};
```

We of course want or input to be [fully controlled](https://angusjf.com/faux-controlled-components/) - although we will keep track of the current stroke inside the component (`currentPoints`).

```tsx
type WhiteboardProps = {
  strokes: Stroke[];
  setStrokes: React.Dispatch<React.SetStateAction<Stroke[]>>;
};
```

```tsx
const DrawInput = ({
  strokes: previousStrokes,
  setStrokes: setPreviousStrokes,
}: WhiteboardProps) => {
  const [currentPoints, setCurrentPoints] = useState<Point[]>([]);
```

We'll create our PanResponder:
```tsx
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (_) => true,
    onMoveShouldSetPanResponder: (_) => true,
    onPanResponderGrant: onTouch,
    onPanResponderMove: onTouch,
    onPanResponderRelease: () => onResponderRelease(),
  });
```

When the user touches the screen, we'll add a point to our current line:
```tsx
  const onTouch = (evt: GestureResponderEvent) => {
    setCurrentPoints([
      ...currentPoints,
      {
        x: evt.nativeEvent.locationX,
        y: evt.nativeEvent.locationY
      },
    ]);
  };
```

When the user 'lets go' of the stroke, we can convert the current path into an svg, and add it to the controlling state.
```tsx
  const onResponderRelease = () => {
    if (currentPoints.length < 1) return;

    if (currentPoints.length === 1) {
      let p = currentPoints[0];
      let distance = Math.sqrt(strokeWidth) / 2;
      currentPoints.push({ x: p.x + distance, y: p.y + distance });
    }

    let newElement: Stroke = {
      type: "Path",
      attributes: {
        d: pointsToSvg(currentPoints),
      },
    };

    setPreviousStrokes((oldPrevStrokes) => [...oldPrevStrokes, newElement]);
    setCurrentPoints([]);
  };
```

Finally, we return the drawn element as an svg, setting the outer `View` to have the correct `panHandlers` from our `PanResponder`.
```tsx
  return (
    <View style={{flex: 1}} {...panResponder.panHandlers}>
      <Svg style={{flex: 1}}>
        <G>
          {previousStrokes.map((stroke) => (
            <Path
              {...stroke.attributes}
              key={JSON.stringify(stroke.attributes)}
            />
          ))}
          <Path
            d={pointsToSvg(currentPoints)}
            stroke="black"
            strokeWidth={4}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
      </Svg>
    </View>
  );
};
```

So how do we convert lists of points into SVG paths? The code is fairly simple.
Say we have a list of points like this:
```ts
[{x: 0, y: 0}, {x: 10, y: 20}, {x: 99, y: 99}]
```
Our [SVG Path Commands](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#path_commands) would look like this.

```
M 0 0 L 10 20 L 99 99
```

```ts
const pointsToSvg = (points: Point[]) => {
  if (points.length > 0) {
    return (
      `M ${points[0].x},${points[0].y}` +
      points.slice(1).map((point) => ` L ${point.x},${point.y}`)
    );
  } else {
    return "";
  }
};
```

## Storing Drawings Efficiently

For 575 we use a no-SQL database, and store the signatures as SVGs. This is not the simplest setup, but it is the most convenient and simple. However, they do create ridiculously long SVGs:

```html
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" version="1.1"> 
  <g>
      <path d="M 76.66665649414062,108.66665649414062 L 75.33332824707031,110.99998474121094, L 75.33332824707031,112.33332824707031, L 76,110.99998474121094, L 78.33332824707031,106.99998474121094, L 84,98.33332824707031, L 91,87.66665649414062, L 97.66665649414062,77.66665649414062, L 103.33332824707031,70.66665649414062, L 114,63.666656494140625, ...
```

The solution here is pretty simple - just round the numbers! We can use `number.toFixed(0)` to chop the decimal point off the end, reducing overall storage size by a factor of 10 with little to no degradation in quality at this scale.

[You can find my finished code here](https://github.com/angusjf/575/blob/b8f9f771bf96438599e892f0e7b888036e6f12da/src/components/Whiteboard.tsx#L34). Happy drawing!