import * as utils from "../utils"

import {
    rect
} from "../../lib/nodes/nodes-rect"

import test from "tape"

const setupFixture = () => {
    const parentElement = new utils.MockHTMLNode();
    const shape = rect(parentElement, "child");

    return {
        parentElement: parentElement,
        shape: shape
    };
};

test("rect node", testCase => {
    testCase.test("SVG Element", t => {
        const shape = setupFixture().shape;

        t.equal(shape.tagName, "rect", "SVG Element tag should be correct");
        t.end();
    });

    testCase.test("$x() property", t => {
        const shape = setupFixture().shape;

        t.equal(shape.$x(), 0, "$x() should have default value set");

        shape.$x(220);

        t.equal(shape.$x(), 220, "$x() should be able to set and read new value");
        t.end();
    });

    testCase.test("$y() property", t => {
        const shape = setupFixture().shape;

        t.equal(shape.$y(), 0, "$y() should have default value set");

        shape.$y(220);

        t.equal(shape.$y(), 220, "$y() should be able to set and read new value");
        t.end();
    });

    testCase.test("$xy() property", testCase => {
        testCase.test("returned value", t => {
            const shape = setupFixture().shape;

            t.deepEqual(shape.$xy(), shape, "$xy() should return the node");
            t.end()
        });

        testCase.test("setting new value directly with $xy()", t => {
            const shape = setupFixture().shape;

            shape.$xy(5, 8);

            t.equal(shape.$y(), 8, "$xy() should have set $y() value");
            t.equal(shape.$x(), 5, "$xy() should have set $x() value");
            t.end();
        });
    });

    testCase.test("$strokeWidth() property", t => {
        const shape = setupFixture().shape;

        t.equal(shape.$strokeWidth(), null, "$strokeWidth() should have default value set");

        shape.$strokeWidth(220);

        t.equal(shape.$strokeWidth(), 220, "$strokeWidth() should be able to set and read new value");
        t.end();
    });

    testCase.test("$width() property", testCase => {
        testCase.test("default $width() value", t => {
            const shape = setupFixture().shape;

            t.equal(shape.$width(), null, "$width() should be null when not set");
            t.end();
        });

        testCase.test("setting $width()", t => {
            const shape = setupFixture().shape;

            shape.$width(10);

            t.equal(shape.$width(), 10, "$width() should be set");
            t.end();
        });

        testCase.test("changing $width() with $x() set to 0", t => {
            const shape = setupFixture().shape;

            shape.$x(0);
            t.equal(shape.$x(), 0, "$x() should have default value");

            shape.$width(10);

            t.equal(shape.$x(), 0, "default $x() should not change");

            shape.$width(20);
            t.equal(shape.$x(), 0, "$x() should be changed when $width is changed");
            t.equal(shape.$width(), 20, "$width() should be updated");
            t.end();
        });

        testCase.test("centering $x() when non-zero", t => {
            const shape = setupFixture().shape;

            shape.$x(30);
            shape.$width(10, true);

            t.equal(shape.$x(), 25, "$x() should be updated to middle of shape");

            shape.$width(20, true);
            // Width changed by 10 px, so $x() needs to be updated by 10/2 = 5px
            t.equal(shape.$x(), 30, "$x() should still be centered");
            t.equal(shape.$width(), 20, "$width() should be updated");
            t.end();
        });
    });

    testCase.test("$height() property", testCase => {
        testCase.test("default $height() value", t => {
            const shape = setupFixture().shape;

            t.equal(shape.$height(), null, "$height() should be null when not set");
            t.end();
        });

        testCase.test("setting $height()", t => {
            const shape = setupFixture().shape;

            shape.$height(10);

            t.equal(shape.$height(), 10, "$height() should be set");
            t.end();
        });

        testCase.test("changing $height() with $x() set to 0", t => {
            const shape = setupFixture().shape;

            shape.$y(0);
            t.equal(shape.$y(), 0, "$y() should have default value");

            shape.$height(10);

            t.equal(shape.$y(), 0, "default $y() should not change");

            shape.$height(20);
            t.equal(shape.$y(), 0, "$y() should be changed when $width is changed");
            t.equal(shape.$height(), 20, "$height() should be updated");
            t.end();
        });

        testCase.test("centering $x() when non-zero", t => {
            const shape = setupFixture().shape;

            shape.$y(30);
            shape.$height(10, true);

            t.equal(shape.$y(), 25, "$y() should be updated to middle of shape");

            shape.$height(20, true);
            // Height changed by 10 px, so $y() needs to be updated by 10/2 = 5px
            t.equal(shape.$y(), 30, "$y() should still be centered");
            t.equal(shape.$height(), 20, "$width() should be updated");
            t.end();
        });
    });
});