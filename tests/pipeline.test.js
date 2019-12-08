import * as utils from "./utils"
import {
  $data
} from "../lib/data/ancui-data"
import {
  container
} from "../lib/ancui-pipeline"

import {
  empty,
} from "../lib/visuals/ancui-visuals"

import {
  $noop
} from "../lib/intents/intents-core"

import test from "tape"

const setupFixtures = () => {
  const data = $data([1, 2, 3]);
  const parentElement = new utils.MockHTMLNode();

  return {
    data,
    parentElement
  }
}

test("Pipeline", testCase => {
  testCase.test("should call all effects", t => {
    let effectsCalled = 0;
    const data = $data([1])
    const parentElement = setupFixtures().parentElement;
    const noopCallback = _ => {
      effectsCalled++;
    };

    const visuals = [
      empty(data, [
        $noop(noopCallback),
        $noop(noopCallback),
        $noop(noopCallback)
      ])
    ];

    const visualsCallback = _ => {
      _.addVisuals(visuals)
    }

    container("test", visualsCallback, parentElement)
    t.equal(effectsCalled, 3);
    t.end();
  });

  testCase.test("container creates svgNode", t => {
    const fixture = setupFixtures();
    const visualsCallback = _ => {};

    container("test", visualsCallback, fixture.parentElement);

    t.equal(fixture.parentElement.childNodes.length, 1);
    t.equal(fixture.parentElement.childNodes[0].constructor.name, "SVGSVGElement", "container should add svgNode to parentElement");
    t.end();
  });


  testCase.test("container adds svgNode to document.body by default", t => {
    const visuals = [
      empty($data([1, 2, 3]), [])
    ];

    const visualsCallback = _ => {
      _.addVisuals(visuals)
    };

    container("test1", visualsCallback);
    const svgNode = document.getElementById("test1");

    t.equal(svgNode.tagName, "svg", "should add svgNode to document.body");
    t.true(svgNode, "should add svgNode to document.body when parentElement is not specified");
    t.end();
  });
});