import {
  MockNode
} from "./utils"
import {
  $data
} from "../../lib/ancui-data"
import {
  arc
} from "../../lib/ancui-core"

import {
  $arcSpanOffset,
  $arcSpanUnit,
  $arcRadiusOffset,
  $arcRadius,
  $arcRotateBy,
  $arcRenderFn,
  $arcIntentFn,
} from "../../lib/ancui-intents-arcs"

describe("Arc Intents", () => {
  let visuals = {};
  let data = $data([8, 5, 10]);
  let normalizedData = data.asNormalized();

  beforeEach(() => {
    let parentNode = new MockNode();
    visuals.$data = data;
    visuals.svgNodes = [].pumpFn(data.itemCount(), () => {
      return arc(parentNode)
    });

    visuals.svgNodes.forEach((v, index) => {
      v._dataValue = normalizedData[index];
    })
  });

  it("$arcRadius() should set the radius of each arc to the same value", () => {
    $arcRadius(10).action(visuals);

    let svgNodes = visuals.svgNodes
    expect(svgNodes[0].$radius()).toBe(10);
    expect(svgNodes[1].$radius()).toBe(10);
    expect(svgNodes[2].$radius()).toBe(10);
  });

  it("$arcRadiusOffset() should increment radius of each arc", () => {
    visuals.svgNodes.forEach((v) => {
      v.$radius(10);
    })

    $arcRadiusOffset(5).action(visuals);

    let svgNodes = visuals.svgNodes
    expect(svgNodes[0].$radius()).toBe(10);
    expect(svgNodes[1].$radius()).toBe(15);
    expect(svgNodes[2].$radius()).toBe(20);
  });

  it("$arcSpanUnit() should set the relative span/length of each arc", () => {
    $arcSpanUnit(60).action(visuals);

    let svgNodes = visuals.svgNodes
    /* Values based on $data */
    /* 8 normalized = 0.8, then 0.8 * span unit becomes 0.8 * 60 = 48*/
    expect(svgNodes[0].$arcSpan()).toBe(48);
    /* 0.5 * 60 = 30 */
    expect(svgNodes[1].$arcSpan()).toBe(30);
    /* 1.0 * 60 = 60 */
    expect(svgNodes[2].$arcSpan()).toBe(60);
  });

  describe("$arcSpanOffset", () => {
    let spanOffset = 50;

    it("should be added to each arc", () => {
      $arcSpanOffset(50).action(visuals);

      let svgNodes = visuals.svgNodes

      expect(svgNodes[0].$startAngle()).toBe(0);
      expect(svgNodes[1].$startAngle()).toBe(spanOffset * 1);
      expect(svgNodes[2].$startAngle()).toBe(spanOffset * 2);
    });

    it("should update visuals.$startAngle()", () => {
      let startAngleInDegrees = 30;

      visuals.svgNodes.forEach((v, index) => {
        v._dataValue = normalizedData[index];
        v.$startAngle(startAngleInDegrees);
      });

      $arcSpanOffset(spanOffset).action(visuals);

      let svgNodes = visuals.svgNodes
      let expected = startAngleInDegrees;
      expect(svgNodes[0].$startAngle()).toBe(expected);

      expected = startAngleInDegrees + spanOffset;
      expect(svgNodes[1].$startAngle()).toBe(expected);

      expected = startAngleInDegrees + spanOffset * 2;
      expect(svgNodes[2].$startAngle()).toBe(expected);
    });

    it("should update visuals.$startAngle() with $arcSpan", () => {
      $arcSpanUnit(60).action(visuals);
      $arcSpanOffset(spanOffset).action(visuals);

      let svgNodes = visuals.svgNodes

      expect(svgNodes[0].$startAngle()).toBe(0);
      expect(svgNodes[1].$startAngle()).toBe(48 + spanOffset);
      expect(svgNodes[2].$startAngle()).toBe((48 + spanOffset) + (30 + spanOffset));
    });
  }); // end describe $arcSpanOffset

  describe("$arcRotateBy", () => {
    let spanOffset = 50;
    let rotationInDegrees = 30;

    it("should increment the visual.$startAngle()", () => {
      let svgNodes = visuals.svgNodes

      expect(svgNodes[0].$startAngle()).toBe(0);
      expect(svgNodes[1].$startAngle()).toBe(0);
      expect(svgNodes[2].$startAngle()).toBe(0);

      $arcRotateBy(rotationInDegrees).action(visuals);

      expect(svgNodes[0].$startAngle()).toBe(rotationInDegrees);
      expect(svgNodes[1].$startAngle()).toBe(rotationInDegrees);
      expect(svgNodes[2].$startAngle()).toBe(rotationInDegrees);
    });

    it("should not interact with $arcSpanUnit", () => {
      $arcRotateBy(rotationInDegrees).action(visuals);
      $arcSpanUnit(60).action(visuals);

      let svgNodes = visuals.svgNodes

      expect(svgNodes[0].$startAngle()).toBe(rotationInDegrees);
      expect(svgNodes[1].$startAngle()).toBe(rotationInDegrees);
      expect(svgNodes[2].$startAngle()).toBe(rotationInDegrees);
    });

    it("should interact with $arcSpanOffset", () => {
      $arcSpanUnit(60).action(visuals);
      $arcSpanOffset(spanOffset).action(visuals);
      $arcRotateBy(rotationInDegrees).action(visuals);

      let svgNodes = visuals.svgNodes
      let expected = rotationInDegrees;
      expect(svgNodes[0].$startAngle()).toBe(expected);

      expected = rotationInDegrees + (48 + spanOffset);
      expect(svgNodes[1].$startAngle()).toBe(expected);

      expected = rotationInDegrees + (48 + spanOffset) + (30 + spanOffset);
      expect(svgNodes[2].$startAngle()).toBe(expected);
    });
  });

  describe("$arcRenderFn", () => {
    it("should execute callback", () => {
      let local = {
        first: 100,
        increment: 10
      };
      let callback = (intent, v, index) => {
        v.$startAngle(intent.data.first + index * intent.data.increment)
      }

      $arcRenderFn(local, callback).action(visuals);

      let svgNodes = visuals.svgNodes
      expect(svgNodes[0].$startAngle()).toBe(local.first);
      expect(svgNodes[1].$startAngle()).toBe(local.first + local.increment);
      expect(svgNodes[2].$startAngle()).toBe(local.first + local.increment * 2);
    });

    it("should call visuals.__renderPath() after executing callback", () => {
      let callback = (intent, v, index) => {
        v.didExecuteCallback = true;
      }

      visuals.svgNodes.forEach((v, index) => {
        v.__renderPath = () => {
          /* This mocked version of __renderPath will only set the startAngle
            if the callback was already called and it set didExecuteCallback.
            It overwrites the built-in version so that we can do the our test.
          */
          if (v.didExecuteCallback) {
            v.$startAngle(100)
          }
        }
      });

      let svgNodes = visuals.svgNodes

      expect(svgNodes[0].$startAngle()).toBe(0); /* Sanity check */
      expect(svgNodes[1].$startAngle()).toBe(0);
      expect(svgNodes[2].$startAngle()).toBe(0);

      $arcRenderFn({}, callback).action(visuals);

      expect(svgNodes[0].$startAngle()).toBe(100);
      expect(svgNodes[1].$startAngle()).toBe(100);
      expect(svgNodes[2].$startAngle()).toBe(100);
    });
  });

  it("$arcIntentFn", () => {
    let visualsCount = 0
    let didExecuteCallback = false;
    let callback = (intent, visuals) => {
      didExecuteCallback = true;
      visualsCount = visuals.length;
    }

    $arcIntentFn({}, callback).action(visuals);
    expect(didExecuteCallback).toBe(true);
    expect(visualsCount).toBe(3);
  });
});
