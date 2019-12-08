import {
    label,
} from "../../lib/visuals/ancui-visuals"
import {
    container
} from "../../lib/ancui-pipeline"

import * as utils from "../utils"

import test from "tape"

const setupFixtures = () => {
    const parentElement = new utils.MockHTMLNode();

    return {
        parentElement: parentElement,
        data: "Hello world"
    };
};

test("label visual", testCase => {
    testCase.test("label should add text to svgNode", t => {
        const fixture = setupFixtures();

        const visuals = [
            label(fixture.data, [])
        ];

        const visualsCallback = _ => {
            _.addVisuals(visuals)
        }

        container("test", visualsCallback, fixture.parentElement)
        const svgNode = fixture.parentElement.childNodes[0];

        t.equal(svgNode.textContent, fixture.data, "textContent should be set to the data");
        t.equal(svgNode.childNodes.length, 1, "the label visuals should only have one child");
        t.end();
    });
});