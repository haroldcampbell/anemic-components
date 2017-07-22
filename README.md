# Anemic Components

[![Build Status](https://travis-ci.org/haroldcampbell/anemic-components.svg?branch=master)](https://travis-ci.org/haroldcampbell/anemic-components)

Rich-data presentation library written in JavaScript (ES6)

This library is still in its infancy (Pre-alpha).

# What does it do?

The library uses a declarative-style programming interface to visualize data.

The code snippet below shows an example of the declarative nature of the library.

```javascript
container("c6", _ => {
  _.bars(barsData, [$group("c6-be"), $maxHeight(50), $y(50), $yOffset(30), $width(150)]);
  _.ellipses(ex6EllipsesData1, [$group("c6-e1"), $maxDiameter(50), $y(50), $ryOffset(30), $x(150)]);
  _.ellipses(ex6EllipsesData2, [$group("c6-e2"), $maxDiameter(60), $y(55), $ryOffset(80), $x(400)]);
  _.connectingLines(linesData1, [$joinGroupItems(["c6-e1", "c6-e2"]), $group("c6-e3"), $maxStrokeWidth(15)]);
  _.onRenderCompleted(() => {
    $moveBelow("c6-e3", "c6-be")
  });
});
```

This produces the following image:

<img src="./common/images/advanced-example.png" width="400">

Please take a look here from more [examples](./examples/index.html).

# Pull Requests

Lots of work left to be done. Looking forward to pull requests.

# Version

0.0.1 (Pre-alpha)
