import * as utils from "./utils"

import {
    group
} from "../lib/nodes/nodes-group"

import test from "tape"

const setupFixture = () => {
    const parentElement = new utils.MockHTMLNode();
    const shape = group(parentElement, "child");

    return {
        parentElement: parentElement,
        shape: shape
    };
};

test("group node", testCase => {
    testCase.test("SVG Element", t => {
        const shape = setupFixture().shape;

        t.equal(shape.tagName, "g", "SVG Element tag should be correct");
        t.end();
    });
});