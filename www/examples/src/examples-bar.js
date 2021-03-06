import {
    $id,
    $data,
    $maxWidth,
    $maxHeight,
    $width,
    $height,
    $alignBottom,
    $alignRight,
    $xOffset,
    $yOffset,
    container,
    bars,
} from './../../assets/dist/ancui.js'

let barsData = $data([50, 20, 30, 10, 50]);

container("bar-1", _ => {
    _.addVisuals([
        bars(barsData, [$maxHeight(50), $yOffset(30), $width(150)])
    ])
}, $id("example-bar-1"));

container("bar-2", _ => {
    _.addVisuals([
        bars(barsData, [$maxHeight(50), $xOffset(30), $width(150), $yOffset(30)])
    ])
}, $id("example-bar-2"));

container("bar-3", _ => {
    _.addVisuals([
        bars($data(barsData.rawData(), "width"), [$maxWidth(50), $yOffset(30), $height(20)])
    ])
}, $id("example-bar-3"));

container("bar-4", _ => {
    _.addVisuals([
        bars($data(barsData.rawData(), "width"), [$maxWidth(50), $alignRight(), $yOffset(30), $height(20)])
    ])
}, $id("example-bar-4"));

container("bar-5", _ => {
    _.addVisuals([
        bars(barsData, [$maxHeight(50), $xOffset(30), $width(15)])
    ])
}, $id("example-bar-5"));

container("bar-6", _ => {
    _.addVisuals([
        bars(barsData, [$maxHeight(50), $alignBottom(100), $xOffset(30), $width(15)])
    ])
}, $id("example-bar-6"));