import * as utils from "../utils"

import {
    ellipse
} from "../../lib/nodes/nodes-ellipse"

import test from "tape"

const setupFixture = () => {
    const parentElement = new utils.MockHTMLNode();
    const shape = ellipse(parentElement, "child");

    return {
        parentElement: parentElement,
        shape: shape
    };
};

test("ellipse node", testCase => {
    testCase.test("SVG Element", t => {
        const shape = setupFixture().shape;

        t.equal(shape.tagName, "ellipse", "SVG Element tag should be correct");
        t.end();
    });

    testCase.test("default property values", t => {
        const shape = setupFixture().shape;

        t.equal(shape.$x(), null, "$x() should have default value set");
        t.equal(shape.$y(), null, "$y() should have default value set");
        t.equal(shape.$height(), null, "$height() should have default value set");
        t.equal(shape.$width(), null, "$width() should have default value set");
        t.end();
    });

    testCase.test("$x() property", t => {
        const shape = setupFixture().shape;

        shape.$x(220);

        t.equal(shape.$x(), 220, "$x() should be able to set and read new value");
        t.end();
    });

    testCase.test("$y() property", t => {
        const shape = setupFixture().shape;

        shape.$y(220);

        t.equal(shape.$y(), 220, "$y() should be able to set and read new value");
        t.end();
    });

    testCase.test("$rx() property", t => {
        const shape = setupFixture().shape;

        shape.$rx(220);

        t.equal(shape.$rx(), 220, "$rx() should be able to set and read new value");
        t.equal(shape.$width(), 220, "$rx() should be able to set $width()");
        t.end();
    });

    testCase.test("$width() property", t => {
        const shape = setupFixture().shape;

        shape.$width(220);

        t.equal(shape.$width(), 220, "$width() should be able to set and read new value");
        t.equal(shape.$rx(), 220, "$width() should be able to set $rx()");
        t.end();
    });

    testCase.test("$height() property", t => {
        const shape = setupFixture().shape;

        shape.$height(220);

        t.equal(shape.$height(), 220, "$height() should be able to set and read new value");
        t.equal(shape.$ry(), 220, "$height() should be able to set $ry()");
        t.end();
    });
});