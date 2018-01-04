import {$data} from "../../lib/ancui-data"
import {createMockedVisual, extendIntentObj} from "./utils"
import {ellipse, getIntents} from "../../lib/ancui-core"

/* Explicity called to force the binding of __intents.internal */
export * from "../../lib/ancui-intents"

describe("Position Intents", () => {
  let visual = null;
  let localIntents;
  let data = $data([10, 20, 0]);

  beforeEach(() => {
    visual = createMockedVisual(ellipse, data);
    localIntents = extendIntentObj(getIntents())
  });

  it("should set x value with $x ", () => {
    localIntents.$x(1).action(visual);
    expect(visual.svgNodes[0].$x()).toBe(1);
  });

  it("should set y value with $y", () => {
    localIntents.$y(1).action(visual);
    expect(visual.svgNodes[0].$y()).toBe(1);
  });
});

describe("rx/ry properties present", () => {
  let visual = null;
  let localIntents;
  let data = $data([10, 20, 0, 10]);

  beforeEach(() => {
    localIntents = extendIntentObj(getIntents())
    visual = createMockedVisual(ellipse, data);
    visual.svgNodes.forEach((v) => {
      v._dataProperty = "diameter";
    })
  });

  it("$rx should update visual.$rx", () => {
    localIntents.$rx(10).action(visual);

    let svgNodes = visual.svgNodes
    expect(svgNodes[0].$rx()).toBe(10);
    expect(svgNodes[1].$rx()).toBe(10);
    expect(svgNodes[2].$rx()).toBe(10);
    expect(svgNodes[3].$rx()).toBe(10);
  });

  it("$ry should update visual.$ry", () => {
    localIntents.$ry(10).action(visual);

    let svgNodes = visual.svgNodes
    expect(svgNodes[0].$ry()).toBe(10);
    expect(svgNodes[1].$ry()).toBe(10);
    expect(svgNodes[2].$ry()).toBe(10);
    expect(svgNodes[3].$ry()).toBe(10);
  });
});
