import {
  $id,
  $data,
  $max,
  $maxHeight,
  $maxDiameter,
  $maxStrokeWidth,
  $x,
  $y,
  $xOffset,
  $yOffset,
  $rxOffset,
  $ryOffset,
  $width,
  $height,
  $moveBelow,
  $alignBottom,
  $joinGroupItems,
  $group,
  container,
} from '../../lib/ancui.js'

var barsData = $data([50, 20, 30, 10, 50], "height");
var linesData1 = $data([
  1, 1, 4,
  2, 1, 5,
  1, 1, 7,
  2, 1, 2,
  5, 1, 1,
], "strokeWidth");
var linesData2 = $data([10, 20, 80, 70, 40], "stroke");

container("c1", _ => {
  _.bars(barsData, [$maxHeight(50), $yOffset(30), $width(150)])
}, $id("example-1"));

container("c2", _ => {
  _.bars(barsData, [$maxHeight(50), $yOffset(30), $xOffset(30), $width(150)])
}, $id("example-2"));

container("c3a", _ => {
  _.bars(barsData, [$maxHeight(50), $xOffset(30), $width(15)])
}, $id("example-3a"));

container("c3b", _ => {
  _.bars(barsData, [$maxHeight(50), $alignBottom(100), $xOffset(30), $width(15)])
}, $id("example-3b"));

var ellipsesData1 = $data([10, 60, 30, 40, 50], "diameter");

container("c4", _ => {
  _.ellipses(ellipsesData1, [$group("c4-e1"), $y(50), $x(30), $xOffset(70), $max(30)])
}, $id("example-4"));

var ex4EllipsesData2 = $data([50, 25, 60, 10, 100], "diameter");
var ex4EllipsesData3 = $data([15, 80, 20, 60, 70], "diameter");
var ex4EllipsesData4 = $data([30, 40, 40, 30, 50], "diameter");

container("c5", _ => {
  _.ellipses(ellipsesData1, [$group("c5-e1"), $y(50), $x(40), $xOffset(80), $max(20)])
  _.ellipses(ex4EllipsesData2, [$group("c5-e2"), $y(50), $x(40), $xOffset(80), $max(40)])
  _.ellipses(ex4EllipsesData3, [$group("c5-e3"), $y(50), $x(40), $xOffset(80), $max(30)])
  _.ellipses(ex4EllipsesData4, [$group("c5-e4"), $y(50), $x(40), $xOffset(80), $max(15)])
}, $id("example-5"));

var ex6EllipsesData1 = $data([50, 20, 30, 10, 50], "diameter");
var ex6EllipsesData2 = $data([20, 10, 30], "diameter");

container("c6", _ => {
  _.bars(barsData, [$group("c6-be"), $maxHeight(50), $y(50), $yOffset(30), $width(150)]);
  _.ellipses(ex6EllipsesData1, [$group("c6-e1"), $maxDiameter(50), $y(50), $ryOffset(30), $x(150)]);
  _.ellipses(ex6EllipsesData2, [$group("c6-e2"), $maxDiameter(60), $y(55), $ryOffset(80), $x(400)]);
  _.connectingLines(linesData1, [$joinGroupItems(["c6-e1", "c6-e2"]), $group("c6-e3"), $maxStrokeWidth(15)]);
  _.onRenderCompleted(() => {
    $moveBelow("c6-e3", "c6-be")
  });
}, $id("example-6"));
