import {
  createMockedVisual
} from "./utils"
import {
  ellipse
} from "../../lib/ancui-core"
import {
  $xOffset,
  $yOffset,
  $width,
  $height,
} from "../../lib/ancui-intents"
import {
  $rx,
  $ry,
  $cxOffset,
  $cyOffset,
} from '../../lib/ancui-intents-ellipses'

import {
  $data
} from "../../lib/ancui-data"

describe("rx/ry Offsets: Supporting properties present", () => {
  let visual = null;
  let data = $data([10, 20, 0, 10]);

  beforeEach(() => {
    visual = createMockedVisual(ellipse, data);
    visual.svgNodes.forEach((v) => {
      v._dataProperty = "diameter";
    })
  });

  it("$cxOffset should update $cx when $rx is set", () => {
    $rx(10).action(visual); // $cxOffset depends on rx being set
    $cxOffset(10).action(visual);

    let svgNodes = visual.svgNodes
    expect(svgNodes[0].$cx()).toBe(10);
    expect(svgNodes[1].$cx()).toBe(40);
    expect(svgNodes[2].$cx()).toBe(70);
    expect(svgNodes[3].$cx()).toBe(100);
  });

  it("$cyOffset should update $cy when $ry is set", () => {
    $ry(10).action(visual); // $cyOffset depends on ry being set
    $cyOffset(10).action(visual);

    let svgNodes = visual.svgNodes
    expect(svgNodes[0].$cy()).toBe(10);
    expect(svgNodes[1].$cy()).toBe(40);
    expect(svgNodes[2].$cy()).toBe(70);
    expect(svgNodes[3].$cy()).toBe(100);
  });
});

/** ----------------------------------------------------------------------- */

describe("rx/ry Offsets: Supporting properties *NOT* present", () => {
  let visual = null;
  let data = $data([10, 20, 0, 10]);

  beforeEach(() => {
    visual = createMockedVisual(ellipse, data);
    visual.svgNodes.forEach((v) => {
      v._dataProperty = "diameter";
    })
  });

  it("$cxOffset should update $cx when $rx is NOT set", () => {
    $cxOffset(10).action(visual);

    let svgNodes = visual.svgNodes
    expect(svgNodes[0].$cx()).toBe(0);
    expect(svgNodes[1].$cx()).toBe(10);
    expect(svgNodes[2].$cx()).toBe(20);
    expect(svgNodes[3].$cx()).toBe(30);
  });

  it("$cyOffset should update $cy when $ry is NOT set", () => {
    $cyOffset(10).action(visual);

    let svgNodes = visual.svgNodes
    expect(svgNodes[0].$cy()).toBe(0);
    expect(svgNodes[1].$cy()).toBe(10);
    expect(svgNodes[2].$cy()).toBe(20);
    expect(svgNodes[3].$cy()).toBe(30);
  });
});

/** ----------------------------------------------------------------------- */

describe("x/y Offset: Supporting properties present", () => {
  let visual = null;
  let data = $data([10, 20, 0, 10]);

  beforeEach(() => {
    visual = createMockedVisual(ellipse, data);
  });

  it("$xOffset should update $x when $width is set", () => {
    $width(10).action(visual); // $xOffset depends on the width to be set
    $xOffset(10).action(visual);

    let svgNodes = visual.svgNodes
    expect(svgNodes[0].$x()).toBe(null);
    expect(svgNodes[1].$x()).toBe(20);
    expect(svgNodes[2].$x()).toBe(40);
    expect(svgNodes[3].$x()).toBe(60);
  });

  it("$yOffset should update $y when $height is set", () => {
    $height(10).action(visual); // $yOffset depends on the height to be set
    $yOffset(10).action(visual);

    let svgNodes = visual.svgNodes
    expect(svgNodes[0].$y()).toBe(null);
    expect(svgNodes[1].$y()).toBe(20);
    expect(svgNodes[2].$y()).toBe(40);
    expect(svgNodes[3].$y()).toBe(60);
  });
});

/** ----------------------------------------------------------------------- */

describe("x/y Offset: Supporting properties *NOT* present", () => {
  let visual = null;
  let data = $data([10, 20, 0, 10]);

  beforeEach(() => {
    visual = createMockedVisual(ellipse, data);
  });

  it("$xOffset should update $x when $width is NOT set", () => {
    $xOffset(10).action(visual);

    let svgNodes = visual.svgNodes
    expect(svgNodes[0].$x()).toBe(null);
    expect(svgNodes[1].$x()).toBe(10);
    expect(svgNodes[2].$x()).toBe(20);
    expect(svgNodes[3].$x()).toBe(30);
  });

  it("$yOffset should update $y when $height is NOT set", () => {
    $yOffset(10).action(visual);

    let svgNodes = visual.svgNodes
    expect(svgNodes[0].$y()).toBe(null);
    expect(svgNodes[1].$y()).toBe(10);
    expect(svgNodes[2].$y()).toBe(20);
    expect(svgNodes[3].$y()).toBe(30);
  });
});