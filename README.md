# AnCUI

[![Build Status](https://travis-ci.org/haroldcampbell/anemic-components.svg?branch=master)](https://travis-ci.org/haroldcampbell/anemic-components)

A rich-data presentation library written in JavaScript (ES6) that demonstrates how Anemic Components can be used for presenting rich-data.

This library is still in its infancy.

# Anemic Components

Anemic Components adhere to five core design principles. When adopted, the resulting components/libraries can be used to:

* visualize rich-data
* perform analytics
* perform statistical analysis

Please take a look the [wiki](https://github.com/haroldcampbell/anemic-components/wiki) from information.

# Installation

First clone the repo with the following command.

```
git clone https://github.com/haroldcampbell/anemic-components

cd anemic-components
```

# Browser Examples

To view the examples, you'll need **nodejs**.

From the `anemic-components` folder install node.js packages.

```
npm install
```

Build the packages.

```
npm run bundle
npm run bundle-examples
```

Start the server.

```
npm start
```

In your browser, navigate to examples:
```
http://localhost:8001/examples/
```

# What can we do right now with AnCUI?

The code snippet below shows an example of the declarative nature of the library.

```javascript
container("c6", _ => {
  _.bars(barsData, [$group("c6-be"), $maxHeight(50), $y(50), $yOffset(30), $width(150)]);
  _.ellipses(ex6EllipsesData1, [$group("c6-e1"), $maxDiameter(50), $y(50), $cyOffset(30), $x(150)]);
  _.ellipses(ex6EllipsesData2, [$group("c6-e2"), $maxDiameter(60), $y(55), $cyOffset(80), $x(400)]);
  _.connectingLines(linesData1, [$joinGroupItems(["c6-e1", "c6-e2"]), $group("c6-e3"), $maxStrokeWidth(15)]);
  _.onRenderCompleted(() => {
    $moveBelow("c6-e3", "c6-be")
  });
});
```

This produces the following image:

<img src="./common/images/advanced-example.png" width="400">

Please take a look the [wiki](https://github.com/haroldcampbell/anemic-components/wiki) from information.


#### Experimental Examples

To run the experimental examples, you will need to:

1. Pull in the submodules by running

```
git submodule init
git submodule update --remote
```

2. Navigate to the experimental examples

```
http://localhost:8001/examples/experimental.html
```
# Pull Requests

Lots of work left to be done. Looking forward to pull requests.

# Version History

- 0.0.5 (Pre-alpha): Add ability to redraw shapes based on new data
