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

    const visualsCallback = domContainer => {
      domContainer.addVisuals(visuals)
    }

    container("test", visualsCallback, parentElement)
    t.equal(effectsCalled, 3);
    t.end();
  });

  testCase.test("container creates svgNode", t => {
    const fixture = setupFixtures();
    const visualsCallback = domContainer => {};

    container("test", visualsCallback, fixture.parentElement);

    t.equal(fixture.parentElement.childNodes.length, 1);
    t.equal(fixture.parentElement.childNodes[0].constructor.name, "SVGSVGElement", "container should add svgNode to parentElement");
    t.end();
  });


  testCase.test("container adds svgNode to document.body by default", t => {
    const visuals = [
      empty($data([1, 2, 3]), [])
    ];

    const visualsCallback = domContainer => {
      domContainer.addVisuals(visuals)
    };

    container("test1", visualsCallback);
    const svgNode = document.getElementById("test1");

    t.equal(svgNode.tagName, "svg", "should add svgNode to document.body");
    t.true(svgNode, "should add svgNode to document.body when parentElement is not specified");
    t.end();
  });

  testCase.test("container calls onRenderCompleted() callback", t => {
    const data = $data([1])
    let stateTracker = "";

    const noopCallback = _ => {
      stateTracker += "a";
    };
    const visuals = [
      empty(data, [$noop(noopCallback), $noop(noopCallback), $noop(noopCallback)])
    ];

    const emptyCallback = _ => {
      stateTracker += "b"
    };

    const visualsCallback = domContainer => {
      domContainer.addVisuals(visuals)
      domContainer.onRenderCompleted(emptyCallback)
    };

    container("test-onRenderCompleted", visualsCallback)

    t.equal(stateTracker, "aaab", "should call onRenderCompleted() after visuals have been rendered");
    t.end();
  });

  testCase.test("visual onFinalizeRender() callback called", t => {
    const data = $data([1])
    let stateTracker = "";

    const noopCallback = _ => {
      stateTracker += "a";
    };

    const visualWithCallback = empty(data, [$noop(noopCallback), $noop(noopCallback), $noop(noopCallback)]);
    visualWithCallback.onFinalizeRender = () => {
      stateTracker += "b"
    }

    const visuals = [
      empty(data, []),
      visualWithCallback,
      empty(data, [$noop(noopCallback), $noop(noopCallback)])
    ];

    const visualsCallback = domContainer => {
      domContainer.addVisuals(visuals);
      domContainer.onRenderCompleted(() => {
        stateTracker += "x"
      });
    };

    container("test-onFinalizeRender", visualsCallback)

    t.equal(stateTracker, "aaabaax", "should call onFinalizeRender() of visual before container onRenderCompleted()");
    t.end();
  });
});