import {rect, ellipse, path, arc} from './ancui-core.js'
import {getVisuals} from './ancui-pipeline.js'

function __createVisual(data) {
  return {
    svgNodes:[],
    $data:data
  }
}

function __wireData($data, dataValue, visual, visuals) {
  visual._dataValue = dataValue;
  visual._dataProperty = $data.target;

  visuals._$data = $data;
  visuals.svgNodes.push(visual);
}

export let __$visuals = getVisuals();
/**
  An empty, noop visual
  @method empty
 */
__$visuals.empty = function(data, effectsArray) {
  let visuals = __createVisual(data);

  data.asNormalized().forEach(d => {
    let v = {};
    __wireData(data, d, v, visuals);
  });

  this.updatePipeline(visuals, effectsArray);

  return this;
}

/**
  Describes the bar visuals
  @method bars
 */
__$visuals.bars = function(data, effectsArray) {
  let visuals = __createVisual(data);

  data.asNormalized().forEach(d => {
    let v = rect(this.currentContainer)
      .$x(0)
      .$y(0)
      .$class("bar");

    __wireData(data, d, v, visuals);
  });

  this.updatePipeline(visuals, effectsArray);

  return this;
}

/**
  Describes the ellipse visuals
  @method ellipses
*/
__$visuals.ellipses = function(data, effectsArray) {
  let visuals = __createVisual(data);

  data.asNormalized().forEach(d => {
    let v = ellipse(this.currentContainer)
      .$x(0)
      .$y(0)
      .$rx(d)
      .$ry(d)
      .$class("ellipse");

    __wireData(data, d, v, visuals);
  });

  this.updatePipeline(visuals, effectsArray);

  return this;
}

/**
  Creates a series of lines that's connected to other visuals.
  @method connectingLines
*/
__$visuals.connectingLines = function(data, effectsArray) {
  let visuals = __createVisual(data);

  data.asNormalized().forEach(d => {
    let v = path(this.currentContainer)
      .$class("path");

    __wireData(data, d, v, visuals);
  });

  this.updatePipeline(visuals, effectsArray);

  return this;
}

/**
  Creates a series of disjoint arcs.
  @method arcs
*/
__$visuals.arcs = function(data, effectsArray) {
  let visuals = __createVisual(data);

  data.asNormalized().forEach(d =>{
    let v = arc(this.currentContainer)
    .$class("arc");

    __wireData(data, d, v, visuals);
  });

  this.updatePipeline(visuals, effectsArray);

  return this;
}
