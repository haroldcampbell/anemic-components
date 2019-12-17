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
    container,
    segments,

    $radialOffset,
    $arcSpread,
    $arcSpanInset,
    $group,
} from './../../assets/dist/ancui.js'

let exSegmentData1 = $data([45, 45, 90, 180]);

container("segment-1", _ => {
    const [x1, x2, x3, x4] = [60, 180, 300, 425];
    const [y1, y2, y3] = [80, 190, 325];

    _.addVisuals([
        // ROW 1
        segments(exSegmentData1, [
            $group("y1-x1"),
            $x(x1), $y(y1),
            $arcRadius(40), $arcSpanUnit(90),
        ]),

        segments(exSegmentData1, [
            $group("y1-x2"),
            $x(x2), $y(y1),
            $arcRadius(40), $arcSpanUnit(90), $arcRadiusOffset(5),
        ]),

        segments(exSegmentData1, [
            $group("y1-x3"),
            $x(x3), $y(y1),
            $arcRadius(40), $arcSpanUnit(90), $arcRadiusOffset(5), $arcRotateBy(30),
        ]),

        segments(exSegmentData1, [
            $group("y1-x4"),
            $x(x4), $y(y1),
            $arcRadius(40), $arcSpanUnit(90), $arcRadiusOffset(5), $radialOffset(20, 2),
        ]),

        // ROW 2
        segments(exSegmentData1, [
            $group("y2-x1"),
            $x(x1), $y(y2),
            $arcRadius(40), $arcSpanUnit(90), $arcSpanOffset(0),
        ]),

        segments(exSegmentData1, [
            $group("y2-x2"),
            $x(x2), $y(y2),
            $arcRadius(40), $arcSpanUnit(90), $arcSpanOffset(10),
        ]),

        segments(exSegmentData1, [
            $group("y2-x3"),
            $x(x3), $y(y2),
            $arcRadius(40), $arcSpanUnit(90), $arcSpanOffset(10), $arcRotateBy(30),
        ]),

        segments(exSegmentData1, [
            $group("y2-x4"),
            $x(x4), $y(y2),
            $arcRadius(40), $arcSpanUnit(90), $arcSpanOffset(10), $arcRotateBy(30), $radialOffset(10, 2),
        ]),

        // ROW 3
        segments(exSegmentData1, [
            $group("y3-x1"),
            $x(x1), $y(y3),
            $arcSpread(360), $arcRadius(40),
        ]),

        segments(exSegmentData1, [
            $group("y3-x2"),
            $x(x2), $y(y3),
            $arcSpread(360), $arcRadius(40), $arcSpanInset(5),
        ]),

        segments(exSegmentData1, [
            $group("y3-x3"),
            $x(x3), $y(y3),
            $arcSpread(360), $arcRadius(40), $arcSpanInset(5), $radialOffset(10, 2),
        ]),

        segments(exSegmentData1, [
            $group("y3-x4"),
            $x(x4), $y(y3),
            $arcSpread(360), $arcRadius(40), $arcSpanInset(5), $arcRotateBy(30), $radialOffset(10),
        ]),
    ]);

    _.onRenderCompleted(domContainer => {
        const codeMap = loadCodeMaps();
        const codePreviewElm = $id("segments-code-preview");

        Object.keys(codeMap).forEach(nodeId => {
            const node = $id(domContainer.getElementById(nodeId));
            node.onmouseover = () => {
                dehighlightNodes(domContainer);
                node.$removeCSS("in-active");
                codePreviewElm.innerHTML = codeMap[nodeId]
            }
        });
    });
}, $id("example-segments"));

function loadCodeMaps() {
    const codeMap = {};

    codeMap["y1-x1"] = `segments(<span class='noise'>exSegmentData1, [
    $x(x1), $y(y1),</span>
    <div class='code-focus'>$arcRadius(<span class='active'>40</span>)</div>,
    <div class='code-focus'>$arcSpanUnit(<span class='active'>90</span>)</div>
<span class='noise'>]</span>)`

    codeMap["y1-x2"] = `segments(<span class='noise'>exSegmentData1, [
    $x(x2), $y(y1),</span>
    $arcRadius(<span class='active'>40</span>),
    $arcSpanUnit(<span class='active'>90</span>),
    <div class='code-focus'>$arcRadiusOffset(<span class='active'>5</span>)</div>
<span class='noise'>]</span>)`

    codeMap["y1-x3"] = `segments(<span class='noise'>exSegmentData1, [
    $x(x3), $y(y1),</span>
    $arcRadius(<span class='active'>40</span>),
    $arcSpanUnit(<span class='active'>90</span>),
    $arcRadiusOffset(<span class='active'>5</span>),
    <div class='code-focus'>$arcRotateBy(<span class='active'>30</span>)</div>
<span class='noise'>]</span>)`

    codeMap["y1-x4"] = `segments(<span class='noise'>exSegmentData1, [
    $x(x4), $y(y1),</span>
    $arcRadius(<span class='active'>40</span>),
    $arcSpanUnit(<span class='active'>90</span>),
    $arcRadiusOffset(<span class='active'>5</span>),
    <div class='code-focus'>$radialOffset(<span class='active'>20</span>, <span class='active'>2</span>)</div>
<span class='noise'>]</span>)`

    codeMap["y2-x1"] = `segments(<span class='noise'>exSegmentData1, [
    $x(x1), $y(y2),</span>
    $arcRadius(<span class='active'>40</span>),
    $arcSpanUnit(<span class='active'>90</span>),
    <div class='code-focus'>$arcSpanOffset(<span class='active'>0</span>)</div>
<span class='noise'>]</span>)`

    codeMap["y2-x2"] = `segments(<span class='noise'>exSegmentData1, [
    $x(x2), $y(y2),</span>
    $arcRadius(<span class='active'>40</span>),
    $arcSpanUnit(<span class='active'>90</span>),
    <div class='code-focus'>$arcSpanOffset(<span class='active'>10</span>)</div>
<span class='noise'>]</span>)`


    codeMap["y2-x3"] = `segments(<span class='noise'>exSegmentData1, [
    $x(x3), $y(y2),</span>
    $arcRadius(<span class='active'>40</span>),
    $arcSpanUnit(<span class='active'>90</span>),
    $arcSpanOffset(<span class='active'>10</span>),
    <div class='code-focus'>$arcRotateBy(<span class='active'>30</span>)</div>
<span class='noise'>]</span>)`

    codeMap["y2-x4"] = `segments(<span class='noise'>exSegmentData1, [
    $x(x4), $y(y2),</span>
    $arcRadius(<span class='active'>40</span>),
    $arcSpanUnit(<span class='active'>90</span>),
    $arcSpanOffset(<span class='active'>10</span>),
    $arcRotateBy(<span class='active'>30</span>),
    <div class='code-focus'>$radialOffset(<span class='active'>10</span>, <span class='active'>2</span>)</div>
<span class='noise'>]</span>)`

    codeMap["y3-x1"] = `segments(<span class='noise'>exSegmentData1, [
    $x(x1), $y(y3),</span>
    <div class='code-focus'>$arcSpread(<span class='active'>360</span>)</div>,
    <div class='code-focus'>$arcRadius(<span class='active'>40</span>)</div>
<span class='noise'>]</span>)`

    codeMap["y3-x2"] = `segments(<span class='noise'>exSegmentData1, [
    $x(x2), $y(y3),</span>
    $arcSpread(<span class='active'>360</span>),
    $arcRadius(<span class='active'>40</span>),
    <div class='code-focus'>$arcSpanInset(<span class='active'>5</span>)</div>
<span class='noise'>]</span>)`

    codeMap["y3-x3"] = `segments(<span class='noise'>exSegmentData1, [
    $x(x3), $y(y3),</span>
    $arcSpread(<span class='active'>360</span>),
    $arcRadius(<span class='active'>40</span>),
    $arcSpanInset(<span class='active'>5</span>),
    <div class='code-focus'>$radialOffset(<span class='active'>10</span>, <span class='active'>2</span>)</div>
<span class='noise'>]</span>)`

    codeMap["y3-x4"] = `segments(<span class='noise'>exSegmentData1, [
    $x(x4), $y(y3),</span>
    $arcSpread(<span class='active'>360</span>),
    $arcRadius(<span class='active'>40</span>),
    $arcSpanInset(<span class='active'>5</span>),
    <div class='code-focus'>$arcRotateBy(<span class='active'>30</span>)</div>,
    <div class='code-focus'>$radialOffset(<span class='active'>10</span>)</div>
<span class='noise'>]</span>)`

    return codeMap;
}

function dehighlightNodes(domContainer) {
    domContainer.childNodes.forEach(node => {
        const elm = $id(node)
        elm.$appendCSS("in-active");
    });
}