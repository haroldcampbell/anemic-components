import {$x, $y} from '../../lib/ancui-intents.js'
import {$rx, $ry} from '../../lib/ancui-intents-ellipses'
import {$data} from "../../lib/ancui-data"
import {createMockedVisual} from "./utils"
import {ellipse} from "../../lib/ancui-core"

describe("Position Intents", () => {
  let visual = null;
  let data = $data([10, 20, 0]);

  beforeEach(() => {
    visual = createMockedVisual(ellipse, data);
  });

  it("should set x value with $x ", () => {
    $x(1).action(visual);
    expect(visual.svgNodes[0].$x()).toBe(1);
  });

  it("should set y value with $y", () => {
    $y(1).action(visual);
    expect(visual.svgNodes[0].$y()).toBe(1);
  });
});

describe("rx/ry properties present", () => {
  let visual = null;
  let data = $data([10, 20, 0, 10]);

  beforeEach(() => {
    visual = createMockedVisual(ellipse, data);
    visual.svgNodes.forEach((v) => {
      v._dataProperty = "diameter";
    })
  });

  it("$rx should update visual.$rx", () => {
    $rx(10).action(visual);

    let svgNodes = visual.svgNodes
    expect(svgNodes[0].$rx()).toBe(10);
    expect(svgNodes[1].$rx()).toBe(10);
    expect(svgNodes[2].$rx()).toBe(10);
    expect(svgNodes[3].$rx()).toBe(10);
  });

  it("$ry should update visual.$ry", () => {
    $ry(10).action(visual);

    let svgNodes = visual.svgNodes
    expect(svgNodes[0].$ry()).toBe(10);
    expect(svgNodes[1].$ry()).toBe(10);
    expect(svgNodes[2].$ry()).toBe(10);
    expect(svgNodes[3].$ry()).toBe(10);
  });
});
