describe("Size Intents", () => {
  var visuals = {};
  var visualsCount = 3;

  beforeEach(() => {
    visuals.svgNodes = [].pumpFn(visualsCount, () => {
      return new MockNode();
    })
  });

  it("should set $width on visuals", () => {
    visuals.svgNodes.forEach((v) => {
      v.$width = _$._width(v);
    })

    $width(150).action(visuals);

    expect(visuals.svgNodes[0].$width()).toBe(150);
  });

  it("should set $height visuals", () => {
    visuals.svgNodes.forEach((v) => {
      v.$height = _$._height(v);
    })

    $height(150).action(visuals);

    expect(visuals.svgNodes[0].$height()).toBe(150);
  });

  describe("[that use a dataValue]", () => {
    var data = [1, 2, 4];
    var normalizedData = $data(data).asNormalized();

    beforeEach(() => {
      visuals.svgNodes.forEach((v, index) => {
        v._dataValue = normalizedData[index];
      });
    });

    it("should set the $maxHeight", () => {
      visuals.svgNodes.forEach((v) => {
        v.$height = _$._height(v);
      });

      $height(100).action(visuals);

      expect(visuals.svgNodes[0].$height()).toBe(100);
      expect(visuals.svgNodes[1].$height()).toBe(100);
      expect(visuals.svgNodes[2].$height()).toBe(100);
    });

    it("should set the $maxWidth", () => {
      visuals.svgNodes.forEach((v) => {
        v.$width = _$._width(v);
      });

      $width(100).action(visuals);

      expect(visuals.svgNodes[0].$width()).toBe(100);
    });

    it("should set $max size", () => {
      visuals.svgNodes.forEach((v) => {
        v.$width = _$._width(v);
        v.$height = _$._height(v);
      });

      $max(100).action(visuals);

      svgNodes = visuals.svgNodes;
      expect(svgNodes[0].$width()).toBe(25);
      expect(svgNodes[0].$height()).toBe(25);

      expect(svgNodes[1].$width()).toBe(50);
      expect(svgNodes[1].$height()).toBe(50);

      expect(svgNodes[2].$width()).toBe(100);
      expect(svgNodes[2].$height()).toBe(100);

    });

    it("should set $maxY", () => {
      visuals.svgNodes.forEach((v) => {
        v._dataProperty = "y";
        v.$y = _$._y(v);
      });

      $maxY(100).action(visuals);

      expect(visuals.svgNodes[0].$y()).toBe(25);
      expect(visuals.svgNodes[1].$y()).toBe(50);
      expect(visuals.svgNodes[2].$y()).toBe(100);
    });

    it("$maxDiameter", () => {
      visuals.svgNodes.forEach((v) => {
        v._dataProperty = "diameter";
        v.$width = _$._width(v);
        v.$height = _$._height(v);
      });

      $maxDiameter(100).action(visuals);

      svgNodes = visuals.svgNodes;
      expect(svgNodes[0].$width()).toBe(12.5);
      expect(svgNodes[0].$height()).toBe(12.5);

      expect(svgNodes[1].$width()).toBe(25);
      expect(svgNodes[1].$height()).toBe(25);

      expect(svgNodes[2].$width()).toBe(50);
      expect(svgNodes[2].$height()).toBe(50);

    });

    it("$maxStrokeWidth", () => {
      visuals.svgNodes.forEach((v) => {
        v._dataProperty = "strokeWidth";
        v.$strokeWidth = _$.__attr(v, "stroke-width");
      });

      $maxStrokeWidth(30).action(visuals);

      expect(visuals.svgNodes[0].$strokeWidth()).toBe(7.5);
      expect(visuals.svgNodes[1].$strokeWidth()).toBe(15);
      expect(visuals.svgNodes[2].$strokeWidth()).toBe(30);
    });
  });
});
