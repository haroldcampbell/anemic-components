import {
    connectingLines,
} from "../../lib/visuals/ancui-visuals"
import {
    $data
} from "../../lib/data/ancui-data"
import {
    container
} from "../../lib/ancui-pipeline"

import * as utils from "../utils"

import test from "tape"

const setupFixtures = () => {
    const data = $data([1, 2, 3]);
    const parentElement = new utils.MockHTMLNode();

    return {
        parentElement: parentElement,
        data,
    };
};

test("connectingLines visual", testCase => {
    testCase.test("connectingLines should add paths to svgNode", t => {
        const fixture = setupFixtures();

        const visuals = [
          connectingLines(fixture.data, [])
        ];

        const visualsCallback = _ => {
          _.addVisuals(visuals)
        }

        container("test", visualsCallback, fixture.parentElement)
        const svgNode = fixture.parentElement.childNodes[0];

        t.equal(svgNode.childNodes.length, 3, "the number of connectingLine visuals should be equal to the number of data items");
        t.end();
      });
});