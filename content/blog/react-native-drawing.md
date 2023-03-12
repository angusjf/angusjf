---
title: "Drawing with React Native"
img_url: "https://angusjf.com/images/drawings.webp"
img_alt: "some drawings from five-seven-five"
date: "2023-03-12"
seo_description: "Creating a touch/drawing input in React Native with Expo"
summary: "Creating a touchscreen drawing input from scratch in less than 100 lines of code"
tags: ["react"]
hidden: false
---

# Drawing with React Native

![some drawings from five-seven-five](https://angusjf.com/images/drawings.webp)

I've been working on 575, *the app for the next generation of Haiku poets* for the last few months, it's my pride and joy. As a team, we love to experiment with light-hearted and non-traditional features that bring a lot of fun to the app. 

One feature is the ability to add your signature to the haikus you post. Think of it as an alternative to a username or profile picture - a bit a of throwback to the Picochats of the Nintendo DS days.

But how would you implement this in React Native, our app framework of choice? The answer is to use `PanResponder`.

## API Design

We will represent a "drawing" as a list of lines, and in turn represent a line as a list of points. A point is just an x and y coordinate:
```tsx
export type Point = {
  x: number;
  y: number;
};
```

We of course want or input to be [fully controlled](https://angusjf.com/faux-controlled-components/)... Although we will keep track of the current stroke ourselves.

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
      `M ${round(points[0].x)},${round(points[0].y)}` +
      points.slice(1).map((point) => ` L ${round(point.x)},${round(point.y)}`)
    );
  } else {
    return "";
  }
};
```


Happy drawing!