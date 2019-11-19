import * as utils from "./utils"
import {
  $data
} from "../lib/ancui-data"
import {
  container
} from "../lib/ancui-pipeline"
import "../lib/ancui-visuals"
import {
  $noop
} from "../lib/ancui-intents"

import test from "tape"
// import browserEnv from 'browser-env';

const setupTest = () => {
  utils.resetVisuals()
  // console.log("document.body.childNodes>>", document.body.childNodes)
  // browserEnv();
  // document.body.childNodes.forEach(node => {
  //   document.body.removeChild(node);
  // });
};

const setupFixtures = () => {
  const data = $data([1, 2, 3]);
  const parentElement = new utils.MockNode();

  return {
    data,
    parentElement
  }
}

test("Pipeline", testCase => {
  testCase.test("should call all effects", t => {
    setupTest();

    let effectsCalled = 0;
    const data = $data([1])
    const parentElement = setupFixtures().parentElement;
    const noopCallback = _ => {
      effectsCalled++;
    };
    const visualsCallback = _ => {
      _.empty(data, [
        $noop(noopCallback),
        $noop(noopCallback),
        $noop(noopCallback)
      ]);
    }

    container("test", visualsCallback, parentElement)
    t.equal(effectsCalled, 3);
    t.end();
  });

  testCase.test("container adds svgNode to document.body by default", t => {
    setupTest();

    const visualsCallback = _ => {
      // _.bars($data([1, 2, 3]), []);
    };

    container("test1", visualsCallback);
    const svgNode = document.getElementById("test1");

    t.true(svgNode, "should add svgNode to document.body when parentElement is not specified");
    t.end();
  });

  testCase.test("container creates svgNode", t => {
    // setupTest();
    const fixture = setupFixtures();
    const visualsCallback = _ => {};

    container("test", visualsCallback, fixture.parentElement);

    t.equal(fixture.parentElement.childNodes.length, 1);
    t.equal(fixture.parentElement.childNodes[0].constructor.name, "SVGSVGElement", "container should add svgNode to parentElement");
    t.end();
  });



  testCase.test("[adding multiple visuals]", testCase => {
    testCase.test("arcs should add paths to svgNode", t => {
      setupTest();
      const fixture = setupFixtures();

      const visualsCallback = _ => {
        // Data consists of 3 elements, so we should get 3 visuals
        _.arcs(fixture.data, []);
      }

      container("test", visualsCallback, fixture.parentElement)
      const svgNode = fixture.parentElement.childNodes[0];

      t.equal(fixture.parentElement.childNodes.length, 1);
      t.equal(svgNode.childNodes.length, 3);
      t.end();
    });

    testCase.test("bar should add rects to svgNode", t => {
      setupTest();
      const fixture = setupFixtures();

      const visualsCallback = _ => {
        // Data consists of 3 elements, so we should get 3 visuals
        _.bars(fixture.data, []);
      }

      container("test", visualsCallback, fixture.parentElement)
      const svgNode = fixture.parentElement.childNodes[0];

      t.equal(svgNode.childNodes.length, 3);
      t.end();
    });

    testCase.test("ellipses should add ellipses to svgNode", t => {
      setupTest();
      const fixture = setupFixtures();

      const visualsCallback = _ => {
        // Data consists of 3 elements, so we should get 3 visuals
        _.ellipses(fixture.data, []);
      }

      container("test", visualsCallback, fixture.parentElement)
      const svgNode = fixture.parentElement.childNodes[0];

      t.equal(svgNode.childNodes.length, 3);
      t.end();
    });

    testCase.test("connectingLines should add paths to svgNode", t => {
      setupTest();
      const fixture = setupFixtures();
      const visualsCallback = _ => {
        // Data consists of 3 elements, so we should get 3 visuals
        _.connectingLines(fixture.data, []);
      }

      container("test", visualsCallback, fixture.parentElement)
      const svgNode = fixture.parentElement.childNodes[0];

      t.equal(svgNode.childNodes.length, 3);
      t.end();
    });
  });
});