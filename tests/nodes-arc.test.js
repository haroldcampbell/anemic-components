import * as utils from "./utils"

import {
    arc
} from "../lib/ancui-nodes-arc"

import {
    $degreesToRadians
} from "../lib/utils"

import test from "tape"

const setupFixture = () => {
    const parentElement = new utils.MockHTMLNode();
    const shape = arc(parentElement, "child");

    return {
        parentElement: parentElement,
        shape: shape,
    };
};

const setupFixtureWithRadius = () => {
    const parentElement = new utils.MockHTMLNode();
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
}

test("arc node", testCase => {
    testCase.test("SVG Element", t => {
        const shape = setupFixture().shape;

        t.equal(shape.tagName, "path", "SVG Element tag should be correct");
        t.end();
    });

    testCase.test("should set defaults", t => {
        const shape = setupFixture().shape;

        t.equal(shape.$radius(), 0);
        t.equal(shape.$startAngle(), 0);
        t.equal(shape.$attr("stroke-linecap"), "round");
        t.end();
    });

    testCase.test("default __renderPath()", t => {
        const shape = setupFixture().shape;

        shape.__renderPath();

        t.equal(shape.$d(), "M 0 0 A 0 0 0 0 1 0 0", "default __renderPath() should set the <path> element's, d attribute's content to all zeros");
        t.end();
    });


    testCase.test("geometry", t => {
        const shape = setupFixture().shape;

        let [cx, cy, r] = [5, 5, 30];
        shape.$x(cx);
        shape.$y(cy);
        shape.$radius(r);
        shape.$arcSpan(120);
        let {
            start,
            end,
            largeArcFlag
        } = shape.__calcRenderData();

        let _path = [
            "M", start.x, start.y,
            "A", r, r, 0, largeArcFlag, 1, end.x, end.y,
        ].join(" ");

        shape.__renderPath();

        t.deepEqual(shape.$d(), _path, "should generate path with M and A commands");
        t.end();
    });

    testCase.test("$endAngle()", t => {
        const shape = setupFixture().shape;

        t.equal(shape.$endAngle(), 0, "$endAngle() should be 0 when not set");

        shape.$arcSpan(100);
        shape.$startAngle(50);

        t.equal(shape.$endAngle(), 150, "$endAngle() should be equal to arcSpan + startAngle");
        t.end();
    });

    testCase.test("$arcSpan()", t => {
        const shape = setupFixture().shape;

        t.equal(shape.$arcSpan(), 0, "$arcSpan() should be 0 when not set");

        shape.$arcSpan(100);

        t.equal(shape.$arcSpan(), 100, "$arcSpan() should set the arc's span");
        t.end();
    });

    testCase.test("$startAngle()", t => {
        const shape = setupFixture().shape;

        t.equal(shape.$startAngle(), 0);

        shape.$startAngle(100);

        t.equal(shape.$startAngle(), 100, "$startAngle() should set the arc's starting angle");
        t.end();
    });

    testCase.test("$radius()", t => {
        const shape = setupFixture().shape;

        shape.$radius(5);
        shape.__renderPath();
        let d = shape.$d(); /** Get the d attribute */

        t.equal(d.includes("A 5 5"), true, "$radius() should set the rx and ry for the A command"); /** Check that x and y are the same as the radius */
        t.end();
    });

    testCase.test("arc.shape[__calcRenderData]", testCase => {
        testCase.test("calc end.y", t => {
            let fixture = setupFixtureWithRadius();
            const shape = fixture.shape;

            shape.$y(fixture.cy);
            shape.$arcSpan(120); /** The span of the arc is 120 degrees*/

            let alpha = shape.$endAngle() - 90; /** Need to rotate anti-clockwise by 90 degrees to align with y-axis */
            let alphaInRadians = $degreesToRadians(alpha)

            let y = fixture.cy + fixture.r * Math.sin(alphaInRadians);
            let end = shape.__calcRenderData().end;

            t.equal(end.y, y, "should calculate the arc's end.y");
            t.end();
        });

        testCase.test("calc end.x", t => {
            let fixture = setupFixtureWithRadius();
            const shape = fixture.shape;

            shape.$x(fixture.cx);
            shape.$arcSpan(120); /** The span of the arc is 120 degrees*/

            let alpha = shape.$endAngle() - 90; /** Need to rotate anti-clockwise by 90 degrees to align with y-axis */
            let alphaInRadians = $degreesToRadians(alpha)

            let x = fixture.cx + fixture.r * Math.cos(alphaInRadians);
            let end = shape.__calcRenderData().end;

            t.equal(end.x, x, "should calculate the arc's end.x");
            t.end();
        });

        testCase.test("calc start.y", t => {
            let fixture = setupFixtureWithRadius();
            const shape = fixture.shape;

            shape.$y(fixture.cy);

            let alpha = shape.$startAngle() - 90; /** Need to rotate anti-clockwise by 90 degrees to align with y-axis */
            let alphaInRadians = $degreesToRadians(alpha)

            let y = fixture.cy + fixture.r * Math.sin(alphaInRadians);
            let start = shape.__calcRenderData().start;

            t.equal(start.y, y, "should calculate the arc's start.y");
            t.end();
        });

        testCase.test("calc start.x", t => {
            let fixture = setupFixtureWithRadius();
            const shape = fixture.shape;

            shape.$x(fixture.cx);

            let alpha = shape.$startAngle() - 90; /** Need to rotate anti-clockwise by 90 degrees to align with y-axis */
            let alphaInRadians = $degreesToRadians(alpha)

            let x = fixture.cx + fixture.r * Math.cos(alphaInRadians);
            let start = shape.__calcRenderData().start;

            t.equal(start.x, x, "should calculate the arc's start.x");
            t.end();
        });
    });
});