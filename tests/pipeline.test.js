import * as utils from "./utils"
import {
  $data
} from "../lib/ancui-data"
import {
  container
} from "../lib/ancui-pipeline"

import {
  empty,
  bars,
  arcs,
  ellipses,
  connectingLines,
} from "../lib/ancui-visuals"

import {
  $noop
} from "../lib/ancui-intents"

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
      bars($data([1, 2, 3]), [])
    ];

    const visualsCallback = _ => {
      _.addVisuals(visuals)
    };

    container("test1", visualsCallback);
    const svgNode = document.getElementById("test1");

    t.true(svgNode, "should add svgNode to document.body when parentElement is not specified");
    t.end();
  });

  testCase.test("[adding multiple visuals]", testCase => {
    testCase.test("arcs should add paths to svgNode", t => {
      const fixture = setupFixtures();

      const visuals = [
        arcs(fixture.data, [])
      ];

      const visualsCallback = _ => {
        _.addVisuals(visuals)
      }

      container("test", visualsCallback, fixture.parentElement)
      const svgNode = fixture.parentElement.childNodes[0];

      t.equal(fixture.parentElement.childNodes.length, 1);
      t.equal(svgNode.childNodes.length, 3, "should get 3 arc visuals matching the data");
      t.end();
    });

    testCase.test("bar should add rects to svgNode", t => {
      const fixture = setupFixtures();

      const visuals = [
        bars(fixture.data, [])
      ];

      const visualsCallback = _ => {
        _.addVisuals(visuals)
      }

      container("test", visualsCallback, fixture.parentElement)
      const svgNode = fixture.parentElement.childNodes[0];

      t.equal(svgNode.childNodes.length, 3, "should get 3 bar visuals matching the data");
      t.end();
    });

    testCase.test("ellipses should add ellipses to svgNode", t => {
      const fixture = setupFixtures();

      const visuals = [
        ellipses(fixture.data, [])
      ];

      const visualsCallback = _ => {
        _.addVisuals(visuals)
      }

      container("test", visualsCallback, fixture.parentElement)
      const svgNode = fixture.parentElement.childNodes[0];

      t.equal(svgNode.childNodes.length, 3, "should get 3 ellipse visuals matching the data");
      t.end();
    });

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

      t.equal(svgNode.childNodes.length, 3, "should get 3 connectingLine visuals matching the data");
      t.end();
    });
  });
});