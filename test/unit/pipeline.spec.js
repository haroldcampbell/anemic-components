describe("Pipeline", () => {
  let initialChildren = null;

  beforeAll(() => {
    initialChildren = captureDocumentBodyChildNodes()
  });

  beforeEach(() => {
    resetVisuals()
  });

  afterEach(() => {
    resetDocumentBody(initialChildren);
  });

  it("should call all effects", () => {
    var effectsCalled = 0;
    const data = $data([])
    const mockNode = new MockNode();
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

    container("test", visualsCallback, mockNode)
    expect(effectsCalled).toBe(3);
  });

  it("should add svgNode to document.body when parentElement is not specified", () => {
    const visualsCallback = _ => {
      _.bars($data([1, 2, 3]), []);
    };
    const visuals = container("test1", visualsCallback);
    const svgNode = document.getElementById("test1");

    didCall2 = true;
    expect(svgNode).toBeTruthy();
  });

  it("should add svgNode to parentElement", () => {
    const parentElement = new MockNode();
    const visualsCallback = _ => {
      _.bars($data([1, 2, 3]), []);
    };
    const visuals = container("test", visualsCallback, parentElement);
    expect(parentElement.childNodes.length).toBe(1);
  });

  describe("[adding multiple visuals]", () => {
    var data = null;
    var parentElement;

    beforeEach(() => {
      data = $data([1, 2, 3]);
      parentElement = new MockNode();
    });

    it("bar should add rects to svgNode", () => {
      const visualsCallback = _ => {
        // Data consists of 3 elements, so we should get 3 visusals
        _.bars(data, []);
      }
      const visuals = container("test", visualsCallback, parentElement)
      const svgNode = parentElement.childNodes[0];

      expect(svgNode.childNodes.length).toBe(3);
    });

    it("ellipses should add ellipses to svgNode", () => {
      const parentElement = new MockNode();
      const visualsCallback = _ => {
        // Data consists of 3 elements, so we should get 3 visusals
        _.ellipses(data, []);
      }
      const visuals = container("test", visualsCallback, parentElement)
      const svgNode = parentElement.childNodes[0];

      expect(svgNode.childNodes.length).toBe(3);
    });

    it("connectingLines should add paths to svgNode", () => {
      const parentElement = new MockNode();
      const visualsCallback = _ => {
        // Data consists of 3 elements, so we should get 3 visusals
        _.connectingLines(data, []);
      }
      const visuals = container("test", visualsCallback, parentElement)
      const svgNode = parentElement.childNodes[0];

      expect(svgNode.childNodes.length).toBe(3);
    });
  });
});
