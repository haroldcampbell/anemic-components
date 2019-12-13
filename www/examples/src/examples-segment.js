import {
    $id,
    $data,
    $x,
    $y,
    $arcRadius,
    $arcRadiusOffset,
    $arcRotateBy,
    $arcSpanUnit,
    $arcSpanOffset,
    $arcLambda,
    container,
    segments,

    ellipses,
    $xOffset,
    $max,
    arcs,
    $radialOffset,
    $arcSpread,
} from './../../assets/dist/ancui.js'

let cirData = $data([10, 10, 10, 10, 10]);

let exSegmentData1 = $data([45, 45, 90, 180]);

// total =
container("segment-1", _ => {
    _.addVisuals([
        segments(exSegmentData1, [$x(100), $y(100), $arcSpread(360), $arcSpanOffset(0), $arcRadius(50)]),
    ]);
}, $id("example-segment-1"));

container("segment-2", _ => {
    _.addVisuals([
        ellipses(cirData, [$y(100), $x(100), $xOffset(50), $max(10)]),
        segments(exSegmentData1, [
            $x(100),
            $y(100), $arcSpanUnit(60), $arcSpanOffset(10), $arcRadius(50),
            $radialOffset(10, 3)
        ]),
    ]);
}, $id("example-segment-2"));