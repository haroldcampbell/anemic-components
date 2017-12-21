
/**
  An Arc Intents lambda. THis allows developers to supply their own arcIntents.

  @method $arcIntentFn
  @param {Object} data - this will be passed to the callback lambda.
  @param {Function} callback - Lambda that accepts the intent itself - @{this},
  and the array of visuals - @{visuals.svgNodes}.

  @return {Object}

  Developers will need to:
    1.  Iterate over the array of visuals in the visuals.svgNodes array,
    2.  Apply their own custom intent logic to each visual,
    3.  Then either use the internal:
        A. __calcRenderData and their own custom render method, or
        B. __renderPath method which will render the path

    This lambda is called internally like this: callback(this, visuals.svgNodes)
*/
export function $arcIntentFn(data, callback) {
  return {
    name: "arcIntentFn",
    data,
    action(visuals) {
      callback(this, visuals.svgNodes);
    } // action
  } // return
}

/**
  An Arc Intents lambda that called on each visual, before the renderPath is
  done.

  @method $arcRenderFn
  @param {Object} data - this will be passed to the callback lambda.
  @param {Function} callback - Callback function should accept three arguments:
    * The first, the intent itself -  @{this},
    * the current visual - @{v}.
    * the index of the current visual in the visuals.svgNodes - @{index},

    This allows developers to supply their own arcIntents, without the need to
    call the __renderPath.

    The lambda is called internally like this: fn(this, v, index);

  @return {Object}
*/
export function $arcRenderFn(data, callback) {
  return {
    name: "arcRenderFn",
    data,
    action(visuals) {
      visuals.svgNodes.forEach((v, index) => {
        callback(this, v, index);
        v.__renderPath();
      })
    } // action
  } // return
}

/**
  Rotates each arc by the specified amount around the radius of the arc.

  @method $arcRotateBy
  @param {Number} data - the amount in degrees by which the arcs should be
    rotated. Positve numbers are clockwise, negative numbers are
    counter-clockwise.

  @return {Object}
*/
export function $arcRotateBy(data) {
  return {
    name: "arcRotateBy",
    data,
    action(visuals) {
      let start = visuals.svgNodes[0].$startAngle()

      for (let v of visuals.svgNodes) {
        start = v.$startAngle() + this.data;
        v.$startAngle(start);
      }
    } // action
  } // return
}

/**
  An offest added between each subsequent arc. It changes the startAngle of
  subsequent arcs which creates a gap between each arc.

  @method $arcSpanOffset
  @param {Number} data - the gap added between each arc.

  @return {Object}

  Note:
    $arcSpanOffset not change the overall length of the arc, but it does alter
    the startAngle. The startAngle of the first arc remains unaffected.
*/
export function $arcSpanOffset(data) {
  return {
    name: "arcSpanOffset",
    data,
    action(visuals) {
      let start = visuals.svgNodes[0].$startAngle();

      for (let v of visuals.svgNodes) {
        v.$startAngle(start);
        v.__renderPath();
        start = start + v.$arcSpan() + this.data;
      }
    } // action
  } // return
}

/**
  Determines the span of each arc based on the unit data (supplied in degrees).

  @method $arcSpanUnit
  @param {Number} data - the base unit (e.g. 60) All arcs will be a multiple of
  this base unit

  @return {Object}
*/
export function $arcSpanUnit(data) {
  return {
    name: "arcSpanUnit",
    data,
    action(visuals) {
      for (let v of visuals.svgNodes) {
        v.$arcSpan(this.data * v._dataValue);
        v.__renderPath();
      }
    } // action
  } // return
}

/**
  Increments the radius of each subsequent arc.

  @method $arcRadiusOffset
  @param {Number} data - the offset to add to each arc's radius.

  @return {Object}

*/
export function $arcRadiusOffset(data) {
  return {
    name: "arcRadiusOffset",
    data,
    action(visuals) {
      let x = visuals.svgNodes[0].$radius()

      for (let v of visuals.svgNodes) {
        v.$radius(x);
        x = x + this.data;
      }
    } // action
  } // return
}

/**
  Sets the radius each arc

  @method $arcRadius
  @param {Number} data - the radius of the arc

  @return {Object}

*/
export function $arcRadius(data) {
  return {
    name: "radius",
    data,
    action(visuals) {
      for (let v of visuals.svgNodes) {
        v.$radius(this.data);
      }
    } // action
  } // return
}
