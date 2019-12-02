import * as utils from "../utils"

import {
    axes
} from "../../lib/nodes/nodes-axes"

import test from "tape"

const setupFixture = () => {
    const parentElement = new utils.MockHTMLNode();
    const shape = axes(parentElement, "child");

    return {
        parentElement: parentElement,
        shape: shape
    };
};

test("axes node", testCase => {
    testCase.test("SVG Element", t => {
        const shape = setupFixture().shape;

        t.equal(shape.tagName, "g", "SVG Element tag should be correct");
        t.end();
    });

    testCase.test("default $class()", t => {
        const shape = setupFixture().shape;

        t.equal(shape.$class(), "axes", "$class() should have default value set");
        t.end();
    });

    testCase.test("xaxis() property", t => {
        const yOffset = 100;
        const fixture = setupFixture();
        const shape = fixture.shape;

        shape.xaxis(yOffset);

        const lineAxis = shape.firstChild;

        t.equal(lineAxis.tagName, "line", "xaxis() should add a line as a child");
        t.equal(lineAxis.$id(), "x-axis", "xaxis() should add a child with id 'x-axis'");
        t.equal(lineAxis.$x1(), 1, "xaxis() should set $x1()");
        t.equal(lineAxis.$x2(), "100%", "xaxis() should set $x2()");
        t.equal(lineAxis.$y1(), yOffset, "xaxis() should set $y1() to yOffset");
        t.equal(lineAxis.$y2(), yOffset, "xaxis() should set $y2() to yOffset");
        t.equal(lineAxis.$width(), "100%", "xaxis() should set $width()");
        t.end();
    });

    testCase.test("yaxis() property", t => {
        const xOffset = 100;
        const fixture = setupFixture();
        const shape = fixture.shape;

        shape.yaxis(xOffset);

        const lineAxis = shape.firstChild;

        t.equal(lineAxis.tagName, "line", "yaxis() should add a line as a child");
        t.equal(lineAxis.$id(), "y-axis", "yaxis() should add a child with id 'y-axis'");
        t.equal(lineAxis.$y1(), 1, "yaxis() should set $y1()");
        t.equal(lineAxis.$y2(), "100%", "yaxis() should set $y2()");
        t.equal(lineAxis.$x1(), xOffset, "yaxis() should set $x1() to xOffset");
        t.equal(lineAxis.$x2(), xOffset, "yaxis() should set $x2() to xOffset");
        t.equal(lineAxis.$height(), "100%", "yaxis() should set $height()");
        t.end();
    });

    // testCase.test("$y() property", t => {
    //     const shape = setupFixture().shape;

    //     shape.$y1(10);
    //     shape.$y2(20);

    //     t.equal(shape.$y1(), 10, "$y1() should be set");
    //     t.equal(shape.$y2(), 20, "$y2() should be set");

    //     t.end();
    // });
});