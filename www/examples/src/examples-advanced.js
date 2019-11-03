import {
$id,
$data,
$maxHeight,
$maxDiameter,
$maxStrokeWidth,
$x,
$y,
$yOffset,
$cyOffset,
$width,
$moveBelow,
$joinGroupItems,
$group,
container,
} from '../../lib/ancui.js'


/* Advanced example */
let barsData = $data([50, 20, 30, 10, 50], "height");
let ex6EllipsesData1 = $data([50, 20, 30, 10, 50], "diameter");
let ex6EllipsesData2 = $data([20, 10, 30], "diameter");
let linesData1 = $data([
  1, 1, 4,
  2, 1, 5,
  1, 1, 7,
  2, 1, 2,
  5, 1, 1,
], "strokeWidth");

container("advanced-1", _ => {
  _.bars(barsData, [$group("c6-be"), $maxHeight(50), $y(50), $yOffset(30), $width(150)]);
  _.ellipses(ex6EllipsesData1, [$group("c6-e1"), $maxDiameter(50), $y(50), $cyOffset(30), $x(150)]);
  _.ellipses(ex6EllipsesData2, [$group("c6-e2"), $maxDiameter(60), $y(55), $cyOffset(80), $x(400)]);
  _.connectingLines(linesData1, [$joinGroupItems(["c6-e1", "c6-e2"]), $group("c6-e3"), $maxStrokeWidth(15)]);
  _.onRenderCompleted(() => {
    $moveBelow("c6-e3", "c6-be")
  });
}, $id("example-advanced-1"));
