import {
    labels,
} from "../../lib/visuals/ancui-visuals"
import {
    container
} from "../../lib/ancui-pipeline"
import {
    $data
} from "../../lib/data/ancui-data"
import {
    $rawDataValue
} from "../../lib/intents/intents-text"

import * as utils from "../utils"

import test from "tape"

const setupFixtures = () => {
    const parentElement = new utils.MockHTMLNode();
    const rawTextData = ["Mars", "Venus", "Earth", "Mars"];
    const rawNumericData = ["10", "20", "44", "43"];

    return {
        parentElement: parentElement,
        rawTextData,
        rawNumericData,
        textData: $data(rawTextData),
        numberData: $data(rawNumericData),
    };
};

test("labels visual", testCase => {
    testCase.test("labels should add text node to svgNode", t => {
        const fixture = setupFixtures();

        const visuals = [
            labels(fixture.textData, [])
        ];

        const visualsCallback = _ => {
            _.addVisuals(visuals)
        };

        container("test", visualsCallback, fixture.parentElement);
        const svgNode = fixture.parentElement.childNodes[0];

        t.equal(svgNode.childNodes.length, 4, "the number of label visuals should be equal to the number of data items");
        t.end();
    });

    testCase.test("$rawDataValue() should set textContent for string data", t => {
        const fixture = setupFixtures();

        const visuals = [
            labels(fixture.textData, [$rawDataValue()])
        ];

        const visualsCallback = _ => {
            _.addVisuals(visuals)
        };

        container("test", visualsCallback, fixture.parentElement);
        const svgNode = fixture.parentElement.childNodes[0];

        const actual = Array.from(svgNode.childNodes).map(t => {
            return t.textContent
        });

        t.deepEqual(actual, fixture.rawTextData, "textContent should contain string data");
        t.end();
    });

    testCase.test("$rawDataValue() should set textContent for numeric data", t => {
        const fixture = setupFixtures();

        const visuals = [
            labels(fixture.numberData, [$rawDataValue()])
        ];

        const visualsCallback = _ => {
            _.addVisuals(visuals)
        };

        container("test", visualsCallback, fixture.parentElement);
        const svgNode = fixture.parentElement.childNodes[0];

        const actual = Array.from(svgNode.childNodes).map(t => {
            return t.textContent
        });

        t.deepEqual(actual, fixture.rawNumericData, "textContent should contain numeric data");
        t.end();
    });
});