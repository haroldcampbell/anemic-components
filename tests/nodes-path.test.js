import * as utils from "./utils"

import {
    path
} from "../lib/ancui-nodes-path"

import test from "tape"

const setupFixture = () => {
    const parentElement = new utils.MockHTMLNode();
    const shape = path(parentElement, "child");

    return {
        parentElement: parentElement,
        shape: shape,
        point1: {x: 10, y: 15},
        point2: {x: 150, y: 95},
        point3: {x: 50, y: 95}
    };
};

test("path node", testCase => {
    testCase.test("SVG Element", t => {
        const shape = setupFixture().shape;

        t.equal(shape.tagName, "path", "SVG Element tag should be correct");
        t.end();
    });

    testCase.test("path string", t => {
        const fixture = setupFixture();

        fixture.shape.$path(fixture.point1, fixture.point2);

        const expectedValue = `M${fixture.point1.x}, ${fixture.point1.y} L${fixture.point2.x}, ${fixture.point2.y}`;
        t.equal(fixture.shape.$d(), expectedValue, "$d() should be set to correct path")
        t.end();
    });

    testCase.test("smoothed path along x-axis", t => {
        const fixture = setupFixture();

        fixture.shape.$path(fixture.point1, fixture.point2, true);

        const w = fixture.point2.x - fixture.point1.x;
        const h = fixture.point2.y - fixture.point1.y;
        const w2 = w / 2;

        const expectedValue = `M${fixture.point1.x},${fixture.point1.y} c${w2},${0} ${w2},${h} ${w},${h}`;
        t.equal(fixture.shape.$d(), expectedValue, "$d() should be set to correct path")
        t.end();
    });

    testCase.test("smoothed path along y-axis", t => {
        const fixture = setupFixture();

        fixture.shape.$path(fixture.point1, fixture.point3, true);

        const w = fixture.point3.x - fixture.point1.x;
        const h = fixture.point3.y - fixture.point1.y;
        const h2 = h / 2;

        const expectedValue = `M${fixture.point1.x},${fixture.point1.y} c${0},${h2} ${w},${h2} ${w},${h}`;
        t.equal(fixture.shape.$d(), expectedValue, "$d() should be set to correct path")
        t.end();
    });
});