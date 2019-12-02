import * as utils from "./utils"

import {
    text
} from "../lib/ancui-nodes-text"

import test from "tape"

const setupFixture = () => {
    const parentElement = new utils.MockHTMLNode();
    const shape = text(parentElement, "child");

    return {
        parentElement: parentElement,
        shape: shape
    };
};

test("line node", testCase => {
    testCase.test("SVG Element", t => {
        const shape = setupFixture().shape;

        t.equal(shape.tagName, "text", "SVG Element tag should be correct");
        t.end();
    });

    testCase.test("default property values", t => {
        const shape = setupFixture().shape;
        const expectedText = "Some random text";

        shape.$text(expectedText)

        t.equal(shape.textContent, expectedText, "textContent should be set");
        t.end();
    });
});