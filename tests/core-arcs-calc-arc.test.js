import * as utils from "./utils"

import {
    arc
} from "../lib/ancui-core"
import {
    $degreesToRadians
} from "../lib/utils"

// For Fake DOM
// import browserEnv from 'browser-env';
// browserEnv();

import test from "tape"

const setupFixture = () => {
    const parentElement = new utils.MockNode();
    const shape = arc(parentElement, "child");
    let [cx, cy, r] = [5, 5, 30];

    shape.$radius(r);
    return {
        parentElement: parentElement,
        shape: shape,
        cx: cx,
        cy: cy,
        r: r
    };
};

test("arc.shape[__calcRenderData]", testCase => {
    testCase.test("calc end.y", t => {
        let fixture = setupFixture();
        const shape = fixture.shape;

        shape.$y(fixture.cy);
        shape.$arcSpan(120); /** The span of the arc is 120 degrees*/

        let alpha = shape.$endAngle() - 90; /** Need to rotate anti-clockwise by 90 degrees to align with y-axis */
        let alphaInRadians = $degreesToRadians(alpha)

        let y = fixture.cy + fixture.r * Math.sin(alphaInRadians);
        let end = shape.__calcRenderData().end;

        t.equal(end.y, y, "should calculate the arc's end.y");
        t.end()
    });

    testCase.test("calc end.x", t => {
        let fixture = setupFixture();
        const shape = fixture.shape;

        shape.$x(fixture.cx);
        shape.$arcSpan(120); /** The span of the arc is 120 degrees*/

        let alpha = shape.$endAngle() - 90; /** Need to rotate anti-clockwise by 90 degrees to align with y-axis */
        let alphaInRadians = $degreesToRadians(alpha)

        let x = fixture.cx + fixture.r * Math.cos(alphaInRadians);
        let end = shape.__calcRenderData().end;

        t.equal(end.x, x, "should calculate the arc's end.x");
        t.end()
    });

    testCase.test("calc start.y", t => {
        let fixture = setupFixture();
        const shape = fixture.shape;

        shape.$y(fixture.cy);

        let alpha = shape.$startAngle() - 90; /** Need to rotate anti-clockwise by 90 degrees to align with y-axis */
        let alphaInRadians = $degreesToRadians(alpha)

        let y = fixture.cy + fixture.r * Math.sin(alphaInRadians);
        let start = shape.__calcRenderData().start;

        t.equal(start.y, y, "should calculate the arc's start.y");
        t.end()
    });

    testCase.test("start.x", t => {
        let fixture = setupFixture();
        const shape = fixture.shape;

        shape.$x(fixture.cx);

        let alpha = shape.$startAngle() - 90; /** Need to rotate anti-clockwise by 90 degrees to align with y-axis */
        let alphaInRadians = $degreesToRadians(alpha)

        let x = fixture.cx + fixture.r * Math.cos(alphaInRadians);
        let start = shape.__calcRenderData().start;

        t.equal(start.x, x, "should calculate the arc's start.x");
        t.end()
    });
});