import {
    vLine,
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
    };
};

test("vLine visual", testCase => {
    testCase.test("vLine should add text to svgNode", t => {
        const fixture = setupFixtures();

        const visuals = [
            vLine([])
        ];

        const visualsCallback = _ => {
            _.addVisuals(visuals)
        }

        container("test", visualsCallback, fixture.parentElement)
        const svgNode = fixture.parentElement.childNodes[0];

        t.equal(svgNode.childNodes.length, 1, "the vLine visuals should only have one child");
        t.equal(svgNode.childNodes[0].tagName, "line", "should have a line node")
        t.equal(svgNode.childNodes[0].$class(), "line", "should have correct CSS class for line")
        t.end();
    });
});