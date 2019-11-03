import {
  $id,
  $data,
  $group,
  $x,
  $y,
  $xOffset,
  $max,
  container,
} from '../../lib/ancui.js'

let ellipsesData1 = $data([10, 60, 30, 40, 50], "diameter");

container("ellipses-1", _ => {
  _.ellipses(ellipsesData1, [$group("c4-e1"), $y(50), $x(30), $xOffset(70), $max(30)]);
}, $id("example-ellipses-1"));

let ex4EllipsesData2 = $data([50, 25, 60, 10, 100], "diameter");
let ex4EllipsesData3 = $data([15, 80, 20, 60, 70], "diameter");
let ex4EllipsesData4 = $data([30, 40, 40, 30, 50], "diameter");

container("ellipses-2", _ => {
  _.ellipses(ellipsesData1, [$group("c5-e1"), $y(50), $x(40), $xOffset(80), $max(20)]);
  _.ellipses(ex4EllipsesData2, [$group("c5-e2"), $y(50), $x(40), $xOffset(80), $max(40)]);
  _.ellipses(ex4EllipsesData3, [$group("c5-e3"), $y(50), $x(40), $xOffset(80), $max(30)]);
  _.ellipses(ex4EllipsesData4, [$group("c5-e4"), $y(50), $x(40), $xOffset(80), $max(15)]);
}, $id("example-ellipses-2"));