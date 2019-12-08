import {
  createMockedVisual
} from "../utils"
import {
  $data
} from "../../lib/data/ancui-data"
import {
  arc
} from "../../lib/nodes/nodes-arc"

import {
  $arcSpanOffset,
  $arcSpanUnit,
  $arcRadiusOffset,
  $arcRadius,
  $arcRotateBy,
  $arcLambda,
  $arcIntentFn,
} from "../../lib/intents/intents-arcs"

import test from "tape"

const setupFixture = () => {
  const data = $data([8, 5, 10]);
  const visual = createMockedVisual(arc, data);

  return {
    data: data,
    visual: visual
  };
};

test("Arc Intents", testCase => {
  testCase.test("$arcRadius() should set the radius of each arc to the same value", t => {
    const visual = setupFixture().visual;
    $arcRadius(10).action(visual);

    let svgNodes = visual.svgNodes
    t.equal(svgNodes[0].$radius(), 10);
    t.equal(svgNodes[1].$radius(), 10);
    t.equal(svgNodes[2].$radius(), 10);
    t.end()
  });

  testCase.test("$arcRadiusOffset() should increment radius of each arc", t => {
    const visual = setupFixture().visual;
    visual.svgNodes.forEach((v) => {
      v.$radius(10);
    })

    $arcRadiusOffset(5).action(visual);

    let svgNodes = visual.svgNodes
    t.equal(svgNodes[0].$radius(), 10);
    t.equal(svgNodes[1].$radius(), 15);
    t.equal(svgNodes[2].$radius(), 20);
    t.end()
  });

  testCase.test("$arcSpanUnit() should set the relative span/length of each arc", t => {
    const visual = setupFixture().visual;
    $arcSpanUnit(60).action(visual);

    let svgNodes = visual.svgNodes
    /* Values based on $data */
    /* 8 normalized = 0.8, then 0.8 * span unit becomes 0.8 * 60 = 48*/
    t.equal(svgNodes[0].$arcSpan(), 48);
    /* 0.5 * 60 = 30 */
    t.equal(svgNodes[1].$arcSpan(), 30);
    /* 1.0 * 60 = 60 */
    t.equal(svgNodes[2].$arcSpan(), 60);
    t.end()
  });

  testCase.test("$arcSpanOffset", testCase => {
    const spanOffset = 50;

    testCase.test("should be added to each arc", t => {
      const visual = setupFixture().visual;
      $arcSpanOffset(50).action(visual);

      let svgNodes = visual.svgNodes

      t.equal(svgNodes[0].$startAngle(), 0);
      t.equal(svgNodes[1].$startAngle(), spanOffset * 1);
      t.equal(svgNodes[2].$startAngle(), spanOffset * 2);
      t.end()
    });

    testCase.test("should update visual.$startAngle()", t => {
      let startAngleInDegrees = 30;
      const visual = setupFixture().visual;

      visual.svgNodes.forEach((v, index) => {
        // v._dataValue = normalizedData[index];
        v.$startAngle(startAngleInDegrees);
      });

      $arcSpanOffset(spanOffset).action(visual);

      let svgNodes = visual.svgNodes
      let expected = startAngleInDegrees;
      t.equal(svgNodes[0].$startAngle(), expected);

      expected = startAngleInDegrees + spanOffset;
      t.equal(svgNodes[1].$startAngle(), expected);

      expected = startAngleInDegrees + spanOffset * 2;
      t.equal(svgNodes[2].$startAngle(), expected);
      t.end()
    });

    testCase.test("should update visual.$startAngle() with $arcSpan", t => {
      const visual = setupFixture().visual;

      $arcSpanUnit(60).action(visual);
      $arcSpanOffset(spanOffset).action(visual);

      let svgNodes = visual.svgNodes

      t.equal(svgNodes[0].$startAngle(), 0);
      t.equal(svgNodes[1].$startAngle(), 48 + spanOffset);
      t.equal(svgNodes[2].$startAngle(), (48 + spanOffset) + (30 + spanOffset));
      t.end()
    });
  }); // end describe $arcSpanOffset

  testCase.test("$arcRotateBy", testCase => {
    const spanOffset = 50;
    const rotationInDegrees = 30;

    testCase.test("should increment the visual.$startAngle()", t => {
      const visual = setupFixture().visual;
      let svgNodes = visual.svgNodes

      t.equal(svgNodes[0].$startAngle(), 0);
      t.equal(svgNodes[1].$startAngle(), 0);
      t.equal(svgNodes[2].$startAngle(), 0);

      $arcRotateBy(rotationInDegrees).action(visual);

      t.equal(svgNodes[0].$startAngle(), rotationInDegrees);
      t.equal(svgNodes[1].$startAngle(), rotationInDegrees);
      t.equal(svgNodes[2].$startAngle(), rotationInDegrees);
      t.end()
    });

    testCase.test("should not interact with $arcSpanUnit", t => {
      const visual = setupFixture().visual;
      $arcRotateBy(rotationInDegrees).action(visual);
      $arcSpanUnit(60).action(visual);

      let svgNodes = visual.svgNodes

      t.equal(svgNodes[0].$startAngle(), rotationInDegrees);
      t.equal(svgNodes[1].$startAngle(), rotationInDegrees);
      t.equal(svgNodes[2].$startAngle(), rotationInDegrees);
      t.end()
    });

    testCase.test("should interact with $arcSpanOffset", t => {
      const visual = setupFixture().visual;
      $arcSpanUnit(60).action(visual);
      $arcSpanOffset(spanOffset).action(visual);
      $arcRotateBy(rotationInDegrees).action(visual);

      let svgNodes = visual.svgNodes
      let expected = rotationInDegrees;
      t.equal(svgNodes[0].$startAngle(), expected);

      expected = rotationInDegrees + (48 + spanOffset);
      t.equal(svgNodes[1].$startAngle(), expected);

      expected = rotationInDegrees + (48 + spanOffset) + (30 + spanOffset);
      t.equal(svgNodes[2].$startAngle(), expected);
      t.end()
    });
  });

  testCase.test("$arcRenderFn", testCase => {
    testCase.test("should execute callback", t => {
      let local = {
        first: 100,
        increment: 10
      };
      let callback = (intent, v, index) => {
        v.$startAngle(intent.data.first + index * intent.data.increment)
      }

      const visual = setupFixture().visual;

      $arcLambda(local, callback).action(visual);

      let svgNodes = visual.svgNodes
      t.equal(svgNodes[0].$startAngle(), local.first);
      t.equal(svgNodes[1].$startAngle(), local.first + local.increment);
      t.equal(svgNodes[2].$startAngle(), local.first + local.increment * 2);
      t.end()
    });

    testCase.test("should call visual.__renderPath() after executing callback", t => {
      let callback = (intent, v, index) => {
        v.didExecuteCallback = true;
      }

      const visual = setupFixture().visual;
      visual.svgNodes.forEach((v, index) => {
        v.__renderPath = t => {
          /* This mocked version of __renderPath will only set the startAngle
            if the callback was already called and it set didExecuteCallback.
            It overwrites the built-in version so that we can do the our test.
          */
          if (v.didExecuteCallback) {
            v.$startAngle(100)
          }
        }
      });

      let svgNodes = visual.svgNodes

      t.equal(svgNodes[0].$startAngle(), 0); /* Sanity check */
      t.equal(svgNodes[1].$startAngle(), 0);
      t.equal(svgNodes[2].$startAngle(), 0);

      $arcLambda({}, callback).action(visual);

      t.equal(svgNodes[0].$startAngle(), 100);
      t.equal(svgNodes[1].$startAngle(), 100);
      t.equal(svgNodes[2].$startAngle(), 100);
      t.end()
    });
  });

  testCase.test("$arcIntentFn", t => {
    let visualCount = 0
    let didExecuteCallback = false;
    let callback = (intent, visual) => {
      didExecuteCallback = true;
      visualCount = visual.length;
    }
    const visual = setupFixture().visual;

    $arcIntentFn({}, callback).action(visual);
    t.equal(didExecuteCallback, true);
    t.equal(visualCount, 3);
    t.end()
  });
});