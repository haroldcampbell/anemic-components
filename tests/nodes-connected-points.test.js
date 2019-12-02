import * as utils from "./utils"

import {
    connectedPoints
} from "../lib/ancui-nodes-connected-points"
import {
    $data
} from "../lib/ancui-data"

import test from "tape"

const setupFixture = (dataProperty) => {
    const parentElement = new utils.MockHTMLNode();
    const rawData = [10, 20];
    const origin = {
        x: 10,
        y: 10
    };

    /* dataProperty "y" or "x" */
    function shapedData(dataProperty) {
        const data = $data(rawData, dataProperty);
        const pairedData = data.collectTuples(2); // Create pairs when tupleLength is 2

        return connectedPoints(parentElement, pairedData[0]);
    }

    return {
        offset: 35,
        origin: origin,
        rawData: rawData,
        shape: shapedData(dataProperty),
    };
};

test("connectedPoints node", testCase => {
    testCase.test("SVG Element", t => {
        const shape = setupFixture().shape;

        t.equal(shape.tagName, "line", "SVG Element tag should be correct");
        t.end();
    });

    testCase.test("data.target is set to 'y'", testCase => {
        testCase.test("$x() and $width()", t => {
            const fixture = setupFixture("y");

            fixture.shape.$x(fixture.origin.x);
            fixture.shape.$width(fixture.offset);
            const expected = fixture.origin.x + fixture.offset;

            t.equal(fixture.shape.$x1(), 10, "$x1() should be set to origin.x value");
            t.equal(fixture.shape.$x2(), expected, "$x2() should be offset by $width()");
            t.end();
        });

        testCase.test("$y", t => {
            const fixture = setupFixture("y");

            fixture.shape.$y(fixture.rawData);

            t.equal(fixture.shape.$y1(), 10, "$y1() should be data[0] passed to $y()");
            t.equal(fixture.shape.$y2(), 20, "$y2() should be data[1] passed to $y()");
            t.end();
        });

        testCase.test("$height", t => {
            const fixture = setupFixture("y");

            fixture.shape.$height(fixture.rawData);

            t.equal(fixture.shape.$y1(), 10, "$y1() should be data[0] passed to $height()");
            t.equal(fixture.shape.$y2(), 20, "$y2() should be data[1] passed to $height()");
            t.end();
        });
    });

    testCase.test("data.target is set to 'x'", testCase => {
        testCase.test("$x() and $width()", t => {
            const fixture = setupFixture("x");

            fixture.shape.$y(fixture.origin.y);
            fixture.shape.$height(fixture.offset);
            const expected = fixture.origin.y + fixture.offset;

            t.equal(fixture.shape.$y1(), 10, "$y1() should be set to origin.y value");
            t.equal(fixture.shape.$y2(), expected, "$y2() should be offset by $height()");
            t.end();
        });

        testCase.test("$y", t => {
            const fixture = setupFixture("x");

            fixture.shape.$x(fixture.rawData);

            t.equal(fixture.shape.$x1(), 10, "$x1() should be data[0] passed to $x()");
            t.equal(fixture.shape.$x2(), 20, "$x2() should be data[1] passed to $x()");
            t.end();
        });

        testCase.test("$height", t => {
            const fixture = setupFixture("x");

            fixture.shape.$width(fixture.rawData);

            t.equal(fixture.shape.$x1(), 10, "$x1() should be data[0] passed to $width()");
            t.equal(fixture.shape.$x2(), 20, "$x2() should be data[1] passed to $width()");
            t.end();
        });
    });
});