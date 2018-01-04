
// Example 1
// Note that all the bar examples use this data
let barsData = ancui.$data([50, 20, 30, 10, 50], "height");

ancui.container("bar-1", _ => {
    _.bars(barsData, i => i.$maxHeight(50).$yOffset(30).$width(150));
}, ancui.$id("example-bar-1"));

// Example 2
ancui.container("bar-2", _ => {
    _.bars(barsData, i => i.$maxHeight(50).$yOffset(30).$xOffset(30).$width(150));
}, ancui.$id("example-bar-2"));

// Example 3
ancui.container("bar-3", _ => {
    _.bars(ancui.$data(barsData.rawData(), "width"), i => i.$maxWidth(50).$yOffset(30).$height(20));
}, ancui.$id("example-bar-3"));

// Example 4
ancui.container("bar-4", _ => {
    _.bars(ancui.$data(barsData.rawData(), "width"), i => i.$maxWidth(50).$alignRight().$yOffset(30).$height(20));
}, ancui.$id("example-bar-4"));

// Example 5
ancui.container("bar-5", _ => {
    _.bars(barsData, i => i.$maxHeight(50).$xOffset(30).$width(15));
}, ancui.$id("example-bar-5"));

// Example 6
ancui.container("bar-6", _ => {
    _.bars(barsData, i => i.$maxHeight(50).$alignBottom(100).$xOffset(30).$width(15));
}, ancui.$id("example-bar-6"));