// import {
//     $id,
//     $data,
//     $maxWidth,
//     $maxHeight,
//     $width,
//     $height,
//     $alignBottom,
//     $alignRight,
//     $xOffset,
//     $yOffset,
//     container,
// } from '/assets/dist/ancui.js'

// Function.prototype.construct = function(aArgs) {
//     var oNew = {};
//     oNew.__proto__ = _a.$data
//     this.apply(oNew, aArgs);
//     return oNew
// }
// ...ancui;

let _ = ancui;

let barsData = _.$data([50, 20, 30, 10, 50], "height");

_.container("bar-1", visual => {
    visual.bars(barsData, [_.$maxHeight(50), _.$yOffset(30), _.$width(150)]);
}, _.$id("example-bar-1"));


_.container("bar-2", visual => {
    visual.bars(barsData, [_.$y(30), _.$maxHeight(20), _.$yOffset(10), _.$width(80), _.$xIncrement(10)]);
}, _.$id("bus-bar-1"));

let multiData = _.$multiData([[50, 10], [20, 15], [30, 5], [10, 30], [50, 15]]);

_.container("bar-3", visual => {
    visual.bars(multiData, [_.$y(30), _.$maxWidth(80, i => i[0]), _.$maxX(20, i => i[1]), _.$yOffset(25), _.$height(20)]);
}, _.$id("bus-bar-2"));


let exArcData1 = _.$data([50, 20, 30, 10, 50], "arc");
// let colorsData = ["#DAF7A6", "#FFC300", "#FF5733", "#C70039", "#900C3F"];

_.container("arc-1", visual => {
    visual.arcs(exArcData1, [_.$x(100), _.$y(100), _.$arcSpanUnit(60), _.$arcRadius(50), _.$arcRadiusOffset(5)])
}, _.$id("bus-arc-1"));

_.container("arc-2", visual => {
    visual.arcs(exArcData1, [_.$x(100), _.$y(100), _.$arcSpanUnit(60), _.$arcRotateBy(90), _.$arcSpanOffset(10), _.$arcRadius(50)])
}, _.$id("bus-arc-2"));