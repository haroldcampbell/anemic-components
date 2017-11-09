describe("Offset Intents", () => {
  describe("rx/ry Offsets: Supporting properties present", () => {
    var visuals = {};

    beforeEach(() => {
      visuals.svgNodes = [].pumpFn(4, () => {
        return new MockNode();
      })
    });

    it("$rxOffset should update $cx when $rx is set", () => {
      visuals.svgNodes.forEach((v) => {
        v._dataProperty = "diameter";
        v.$cx = _$.__attr(v, "cx");
        v.$rx = _$.__attr(v, "rx");
        v.$rx(10);
      })

      $rxOffset(10).action(visuals);

      svgNodes = visuals.svgNodes
      expect(svgNodes[0].$cx()).toBe(10);
      expect(svgNodes[1].$cx()).toBe(40);
      expect(svgNodes[2].$cx()).toBe(70);
      expect(svgNodes[3].$cx()).toBe(100);
    });

    it("$ryOffset should update $cy when $ry is set", () => {
      visuals.svgNodes.forEach((v) => {
        v._dataProperty = "diameter";
        v.$cy = _$.__attr(v, "cy");
        v.$ry = _$.__attr(v, "ry");
        v.$ry(10);
      })

      $ryOffset(10).action(visuals);

      svgNodes = visuals.svgNodes
      expect(svgNodes[0].$cy()).toBe(10);
      expect(svgNodes[1].$cy()).toBe(40);
      expect(svgNodes[2].$cy()).toBe(70);
      expect(svgNodes[3].$cy()).toBe(100);
    });
  });

  /** ----------------------------------------------------------------------- */

  describe("rx/ry Offsets: Supporting properties *NOT* present", () => {
    var visuals = {};

    beforeEach(() => {
      visuals.svgNodes = [].pumpFn(4, () => {
        return new MockNode();
      })
    });

    it("$rxOffset should update $cx when $rx is NOT set", () => {
      visuals.svgNodes.forEach((v) => {
        v._dataProperty = "diameter";
        v.$cx = _$.__attr(v, "cx");
        v.$rx = _$.__attr(v, "rx");
      })

      $rxOffset(10).action(visuals);

      svgNodes = visuals.svgNodes
      expect(svgNodes[0].$cx()).toBe(0);
      expect(svgNodes[1].$cx()).toBe(10);
      expect(svgNodes[2].$cx()).toBe(20);
      expect(svgNodes[3].$cx()).toBe(30);
    });

    it("$ryOffset should update $cy when $ry is NOT set", () => {
      visuals.svgNodes.forEach((v) => {
        v._dataProperty = "diameter";
        v.$cy = _$.__attr(v, "cy");
        v.$ry = _$.__attr(v, "ry");
      })

      $ryOffset(10).action(visuals);

      svgNodes = visuals.svgNodes
      expect(svgNodes[0].$cy()).toBe(0);
      expect(svgNodes[1].$cy()).toBe(10);
      expect(svgNodes[2].$cy()).toBe(20);
      expect(svgNodes[3].$cy()).toBe(30);
    });
  });

  /** ----------------------------------------------------------------------- */
  describe("x/y Offset: Supporting properties present", () => {
    var visuals={};

    beforeEach(() => {
      visuals.svgNodes = [].pumpFn(4, () => {
        return new MockNode();
      })
    });

    it("$xOffset should update $x when $width is set", () => {
      visuals.svgNodes.forEach((v) => {
        v.$x = _$._x(v);
        v.$width = _$._width(v);
        v.$width(10);
      })

      $xOffset(10).action(visuals);

      svgNodes = visuals.svgNodes
      expect(svgNodes[0].$x()).toBe(null);
      expect(svgNodes[1].$x()).toBe(20);
      expect(svgNodes[2].$x()).toBe(40);
      expect(svgNodes[3].$x()).toBe(60);
    });

    it("$yOffset should update $y when $height is set", () => {
      visuals.svgNodes.forEach((v) => {
        v.$y = _$._y(v);
        v.$height = _$._height(v);
        v.$height(10);
      })

      $yOffset(10).action(visuals);

      svgNodes = visuals.svgNodes
      expect(svgNodes[0].$y()).toBe(null);
      expect(svgNodes[1].$y()).toBe(20);
      expect(svgNodes[2].$y()).toBe(40);
      expect(svgNodes[3].$y()).toBe(60);
    });
  });

  /** ----------------------------------------------------------------------- */
  describe("x/y Offset: Supporting properties *NOT* present", () => {
    var visuals = {};

    beforeEach(() => {
      visuals.svgNodes = [].pumpFn(4, () => {
        return new MockNode();
      })
    });

    it("$xOffset should update $x when $width is NOT set", () => {
      visuals.svgNodes.forEach((v) => {
        v.$x = _$._x(v);
        v.$width = _$._width(v);
      })

      $xOffset(10).action(visuals);

      svgNodes = visuals.svgNodes
      expect(svgNodes[0].$x()).toBe(null);
      expect(svgNodes[1].$x()).toBe(10);
      expect(svgNodes[2].$x()).toBe(20);
      expect(svgNodes[3].$x()).toBe(30);
    });

    it("$yOffset should update $y when $height is NOT set", () => {
      visuals.svgNodes.forEach((v) => {
        v.$y = _$._y(v);
        v.$height = _$._height(v);
      })

      $yOffset(10).action(visuals);

      svgNodes = visuals.svgNodes
      expect(svgNodes[0].$y()).toBe(null);
      expect(svgNodes[1].$y()).toBe(10);
      expect(svgNodes[2].$y()).toBe(20);
      expect(svgNodes[3].$y()).toBe(30);
    });
  });
});
