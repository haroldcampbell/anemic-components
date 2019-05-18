import * as utils from "./utils"
import {$data} from "../../lib/ancui-data"
import {container} from "../../lib/ancui-pipeline"
import "../../lib/ancui-visuals"
import {$noop} from "../../lib/ancui-intents"

describe("Pipeline", () => {
  let initialChildren = null;

  beforeAll(() => {
    initialChildren = utils.captureDocumentBodyChildNodes()
  });

  beforeEach(() => {
    utils.resetVisuals()
  });

  afterEach(() => {
    utils.resetDocumentBody(initialChildren);
  });

  it("should call all effects", () => {
    let effectsCalled = 0;
    const data = $data([1])
    const mockNode = new utils.MockNode();
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

    container("test1", visualsCallback);
    const svgNode = document.getElementById("test1");

    expect(svgNode).toBeTruthy();
  });

  it("should add svgNode to parentElement", () => {
    const parentElement = new utils.MockNode();
    const visualsCallback = _ => {
      _.bars($data([1, 2, 3]), []);
    };

    container("test", visualsCallback, parentElement);
    expect(parentElement.childNodes.length).toBe(1);
  });

  describe("[adding multiple visuals]", () => {
    let data = null;
    let parentElement;

    beforeEach(() => {
      data = $data([1, 2, 3]);
      parentElement = new utils.MockNode();
    });

    it("arcs should add paths to svgNode", () => {
      const visualsCallback = _ => {
        // Data consists of 3 elements, so we should get 3 visusals
        _.arcs(data, []);
      }

      container("test", visualsCallback, parentElement)
      const svgNode = parentElement.childNodes[0];

      expect(svgNode.childNodes.length).toBe(3);
    });

    it("bar should add rects to svgNode", () => {
      const visualsCallback = _ => {
        // Data consists of 3 elements, so we should get 3 visusals
        _.bars(data, []);
      }

      container("test", visualsCallback, parentElement)
      const svgNode = parentElement.childNodes[0];

      expect(svgNode.childNodes.length).toBe(3);
    });

    it("ellipses should add ellipses to svgNode", () => {
      const parentElement = new utils.MockNode();
      const visualsCallback = _ => {
        // Data consists of 3 elements, so we should get 3 visusals
        _.ellipses(data, []);
      }

      container("test", visualsCallback, parentElement)
      const svgNode = parentElement.childNodes[0];

      expect(svgNode.childNodes.length).toBe(3);
    });

    it("connectingLines should add paths to svgNode", () => {
      const parentElement = new utils.MockNode();
      const visualsCallback = _ => {
        // Data consists of 3 elements, so we should get 3 visusals
        _.connectingLines(data, []);
      }

      container("test", visualsCallback, parentElement)
      const svgNode = parentElement.childNodes[0];

      expect(svgNode.childNodes.length).toBe(3);
    });
  });
});
