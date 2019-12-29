import {
    $id,
    $data,
    $x,
    $y,
    $arcRadius,
    $arcRadiusOffset,
    $arcSpanUnit,
    $arcSpanOffset,
    container,
    chords,
    arcs,
    $group,
    segments,
    $arcSpread,
    $arcSpanInset,
    $radialOffset,
    $arcRotateBy,
    $appendCSS,
    $arcAlignArcs,
    $strokeWidth,
    $strokeLineCap,
    $lambda,
} from '../../assets/dist/ancui.js'

let exChordData1 = $data([10, 20, 30, 60, 120]);
let exChordData2 = $data([10, 10, 10, 10, 10]);

container("chord-1", _ => {
    const [x1, x2, x3, x4] = [60, 180, 300, 425];
    const [y1, y2, y3] = [80, 190, 325];

    _.addVisuals([
        segments(exChordData1, [
            $group("y1-x1"),
            $x(x1), $y(y1),
            $arcRadius(40), $arcSpanUnit(90), $arcSpanOffset(5),
        ]),

        arcs(exChordData1, [
            $group("y1-x2"),
            $x(x2), $y(y1),
            $arcRadius(40), $arcSpanUnit(90), $arcSpanOffset(5),
        ]),

        chords(exChordData1, [
            $group("y1-x3"),
            $x(x3), $y(y1),
            $arcRadius(40), $arcSpanUnit(90), $arcSpanOffset(5),
        ]),

        // ROW 2
        segments(exChordData1, [
            $group("y2-x1"),
            $x(x1), $y(y2),
            $arcSpread(360), $arcRadius(40), $arcSpanInset(2), $radialOffset(10, 2),
        ]),

        arcs(exChordData1, [
            $group("y2-x2"),
            $x(x2), $y(y2),
            $arcSpread(360), $arcRadius(40), $arcSpanInset(2), $radialOffset(10, 2),
        ]),

        chords(exChordData1, [
            $group("y2-x3"),
            $x(x3), $y(y2),
            $arcSpread(360), $arcRadius(40), $arcSpanInset(2), $radialOffset(10, 2),
        ]),

        // ROW 3
        chords(exChordData1,
            radialIntents("y3-x1-1", x1, y3, [
                $arcRadiusOffset(5),
            ])),
        chords(exChordData1,
            radialIntents("y3-x1-2", x1, y3, [
                $arcRadiusOffset(5),
                $arcRotateBy(30)
            ])),
        chords(exChordData1,
            radialIntents("y3-x1-3", x1, y3, [
                $arcRadiusOffset(5),
                $arcRotateBy(60),
                // $arcAlignArcs(0),
            ])),

        // --
        chords(exChordData1,
            radialIntents("y3-x2", x2, y3, [
                $arcRadiusOffset(5),
                $arcAlignArcs(1),
            ])),
        chords(exChordData1,
            radialIntents("y3-x2", x2, y3, [
                $arcRadiusOffset(5),
                $arcRotateBy(30)
            ])),

        arcs($data([82, 75, 62, 50]),
            [$x(x4), $y(y3),
                $arcRadius(20),
                $arcRadiusOffset(15),
                $arcSpanUnit(295.2), // max of data => 82 => 82% of 360 => 295.2
                $arcRotateBy(-114.8),
                $strokeWidth(10),
                $strokeLineCap("square"),
                $arcAlignArcs(1),
                $lambda([.25, .5, .75, 1], (i, v, index) => {
                    v.$style(`${v.$style()}; opacity:${i.data[index]}`);
                }),
            ]),
    ]);

    _.addVisuals(radarComponent(exChordData2, x3, y3));
}, $id("example-chords"));

function radialIntents(name, x, y, additionalIntents) {
    const baseIntents = [
        $group(name),
        $x(x), $y(y),
        $arcRadius(40),
        $arcSpanUnit(30),
    ]
    return [...baseIntents, ...additionalIntents]
}

function radarIntentTemplate(x, y, segment, segmentSpan) {
    return [$group(`y3-x3-${segment+1}`),
        $x(x), $y(y),
        $arcRadius(20),
        $arcSpanUnit(segmentSpan),
        $arcRadiusOffset(8),
        $arcRotateBy(segmentSpan * segment),
    ]
}

function radarComponent(data, x, y, visuals) {
    const segmentCount = 5;
    const componentList = [];
    const segmentSpan = (360) / segmentCount;

    for (let segment = 0; segment < segmentCount; segment++) {
        componentList.push(
            chords(data, radarIntentTemplate(x, y, segment, segmentSpan)),
            arcs(data, [...radarIntentTemplate(x, y, segment, segmentSpan),
                $appendCSS('filled-chord')
            ])
        );
    }
    return componentList;
}