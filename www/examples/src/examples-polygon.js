import {
    $id,
    $data,
    $x,
    $y,
    ellipses,
    container,
    segments,
    $appendCSS,
    polygon,
    $arcMaxRadius,
    $arcEquiSpan,
    $style,
    $maxWidth,
    $maxHeight,
    radialLines,
} from '../../assets/dist/ancui.js'

let exChordData1 = $data([10, 20, 30, 60, 25]);
let exChordData2 = $data([1, 15, 30, 45, 60]);
let exLineMarks = $data([1, 1, 1, 1, 1]);

container("polygon-1", _ => {
    const [x1, x2, x3, x4] = [60, 180, 300, 425];
    const [y1, y2, y3] = [80, 190, 325];

    _.addVisuals([
        segments(exChordData1, [
            $x(x1), $y(y1),
            $arcMaxRadius(60),
            $arcEquiSpan(360),
        ]),

        polygon(exChordData1, [
            $x(x2), $y(y1),
            $arcMaxRadius(60),
            $arcEquiSpan(360),
        ]),

        ellipses(exChordData2, [
            $x(x3), $y(y1),
            $maxHeight(60),
            $maxWidth(60),
            $style("fill: none; stroke: #ccc;")
        ]),

        radialLines(exLineMarks, [
            $x(x3), $y(y1),
            $arcMaxRadius(60),
            $arcEquiSpan(360),
            $appendCSS("radial-line-dark")
        ]),

        polygon(exChordData1, [
            $x(x3), $y(y1),
            $arcMaxRadius(60),
            $arcEquiSpan(360),
        ]),

        radialLines(exChordData1, [
            $x(x3), $y(y1),
            $arcMaxRadius(60),
            $arcEquiSpan(360),
        ]),
    ]);
}, $id("example-polygon"));
