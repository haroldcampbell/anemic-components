import * as utils from "./utils"

import {
    hLine
} from "../lib/ancui-nodes-hline"

import test from "tape"

const setupFixture = () => {
    const parentElement = new utils.MockHTMLNode();
    const shape = hLine(parentElement, "child");

    return {
        parentElement: parentElement,
        shape: shape
    };
};

test("hLine node", testCase => {
    testCase.test("SVG Element", t => {
        const shape = setupFixture().shape;

        t.equal(shape.tagName, "line", "SVG Element tag should be correct");
        t.end();
    });

    testCase.test("default property values", t => {
        const shape = setupFixture().shape;

        t.equal(shape.$x(), null, "$x() should have default value set");
        t.equal(shape.$x1(), null, "$x1() should have default value set");
        t.equal(shape.$x2(), null, "$x2() should have default value set");

        t.equal(shape.$y(), null, "$y() should have default value set");
        t.equal(shape.$y1(), null, "$y1() should have default value set");
        t.equal(shape.$y2(), null, "$y2() should have default value set");

        t.equal(shape.$width(), null, "$width() should have default value set");
        t.end();
    });

    testCase.test("$x() property", t => {
        const shape = setupFixture().shape;

        shape.$x(220);

        t.equal(shape.$x(), 220, "$x() should be to new $x() value");
        t.equal(shape.$x1(), 220, "$x1() should be set to $x() value");
        t.equal(shape.$x2(), 220, "$x2() should be set to $x() value");

        t.end();
    });

    testCase.test("$y() property", t => {
        const shape = setupFixture().shape;

        shape.$y(220);

        t.equal(shape.$y(), 220, "$y() should be to new $y() value");
        t.equal(shape.$y1(), 220, "$y1() should be set to $y() value");
        t.equal(shape.$y2(), 220, "$y2() should be set to $y() value");

        t.end();
    });

    testCase.test("$width() property", t => {
        const shape = setupFixture().shape;
        const startValue = 20;
        const offsetValue = 220;
        const arbitraryValue = 132;

        shape.$y(arbitraryValue);
        shape.$x(startValue);
        shape.$width(offsetValue);
        const expectedValued = startValue + offsetValue;

        t.equal(shape.$width(), offsetValue, "$width() should be to new $width() value");
        t.equal(shape.$x1(), startValue, "$x1() should be set starting value");
        t.equal(shape.$x2(), expectedValued, "$x2() should be offset by width");

        t.equal(shape.$y(), arbitraryValue, "$y() should be not change");

        t.end();
    });
});