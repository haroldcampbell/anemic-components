import {
    $id,
    $data,
    $group,
    $x,
    $y,
    $xOffset,
    $max,
    container,
    ellipses,
} from './../../assets/dist/ancui.js'

let ellipsesData1 = $data([10, 60, 30, 40, 50]);

container("ellipses-1", _ => {
    _.addVisuals([
        ellipses(ellipsesData1, [$group("c4-e1"), $y(50), $x(30), $xOffset(70), $max(30)])
    ]);
}, $id("example-ellipses-1"));

let ex4EllipsesData2 = $data([50, 25, 60, 10, 100]);
let ex4EllipsesData3 = $data([15, 80, 20, 60, 70]);
let ex4EllipsesData4 = $data([30, 40, 40, 30, 50]);

container("ellipses-2", _ => {
    _.addVisuals([
        ellipses(ellipsesData1, [$group("c5-e1"), $y(50), $x(40), $xOffset(80), $max(20)]),
        ellipses(ex4EllipsesData2, [$group("c5-e2"), $y(50), $x(40), $xOffset(80), $max(40)]),
        ellipses(ex4EllipsesData3, [$group("c5-e3"), $y(50), $x(40), $xOffset(80), $max(30)]),
        ellipses(ex4EllipsesData4, [$group("c5-e4"), $y(50), $x(40), $xOffset(80), $max(15)]),
    ]);
}, $id("example-ellipses-2"));