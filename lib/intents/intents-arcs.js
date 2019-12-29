import * as utils from '../utils'

/**
  An extension Intent arcLambda that is called on each visual, before the renderPath is
  done.

  @function $arcLambda
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
export function $arcLambda(data, callback) {
  return {
    name: "arcLambda",
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
  An Arc Intents lambda. THis allows developers to supply their own arcIntents.

  @function $arcIntentFn
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
  Rotates each arc by the specified amount around the radius of the arc.

  @function $arcRotateBy
  @param {Number} data - the amount in degrees by which the arcs should be
    rotated. Positive numbers are clockwise, negative numbers are
    counter-clockwise.

  @return {Object}
*/
export function $arcRotateBy(data) {
  return {
    name: "arcRotateBy",
    data,
    action(visuals) {
      for (let v of visuals.svgNodes) {
        const start = v.$startAngle() + this.data;
        v.$startAngle(start);
        v.__renderPath();
      }
    } // action
  } // return
}

/**
  Sets the start angle of each arc to the specified data

  @function $arcRotateBy

  @param {Number} data - the amount in degrees from where each arc should start.
    Positive numbers are clockwise, negative numbers are counter-clockwise.

  @return {Object}
*/
export function $arcStartAngle(data) {
  return {
    name: "arcRotateBy",
    data,
    action(visuals) {
      for (let v of visuals.svgNodes) {
        v.$startAngle(this.data);
        v.__renderPath();
      }
    } // action
  } // return
}

/**
 * Aligns the arc based on the largest arc.
 *
 * @function $arcAlignArcs
 *
 * @param {Number} data - describes the alignment type.
 * -1 : Left algin (does the same as the $arcStartAngle(x))
 * 0 :  Center align
 * 1 : Right align
 *
 * @return {Object}
 */
export function $arcAlignArcs(data = 0) {
  return {
    name: "arcAlignArcs",
    data,
    action(visuals) {
      const maxArcSpan = visuals.svgNodes
        .map(node => node.$arcSpan())
        .reduce((prev, curr) => {
          return curr > prev ? curr : prev
        }, 0);

      switch (data) {
        case -1:
          this.alignLeft(visuals);
          break;
        case 0:
          this.alignCenter(visuals, maxArcSpan);
          break;
        case 1:
          this.alignRight(visuals, maxArcSpan);
          break;
      }
    },
    alignLeft(visuals) {
      const maxArcStartAngle = visuals.svgNodes
        .map(node => node.$startAngle())
        .reduce((prev, curr) => {
          return curr > prev ? curr : prev
        }, 0);

      for (let v of visuals.svgNodes) {
        v.$startAngle(maxArcStartAngle)
        v.__renderPath();
      }
    },
    alignCenter(visuals, maxArcSpan) {
      for (let v of visuals.svgNodes) {
        const offset = (maxArcSpan - v.$arcSpan()) / 2.0;
        const newStartAngle = v.$startAngle() + offset;
        v.$startAngle(newStartAngle)
        v.__renderPath();
      }
    },
    alignRight(visuals, maxArcSpan) {
      for (let v of visuals.svgNodes) {
        const offset = maxArcSpan - v.$arcSpan();
        const newStartAngle = v.$startAngle() + offset;
        v.$startAngle(newStartAngle)
        v.__renderPath();
      }
    },
  }
}
/**
 * Ensures that combined arc elements fills the specified span.
 *
 * Examples:
 *    To fill the full 360 degrees (like in a Pie Chart): $arcFill(360)
 *    To fill only 180 degrees: $arcFill(180)
 *
 * @function $arcSpread
 * @param {Number} data - How much should the combined arc fill.
 *
 * @return {Object}
 */
export function $arcSpread(data) {
  return {
    name: "arcSpread",
    data,
    action(visuals) {
      const maxValue = visuals.getData().max();
      const summedData = visuals.getData().summedData();
      const spanRatio = summedData / data;
      const spanFactor = maxValue / spanRatio;

      let prevStartAngle = 0;
      for (let v of visuals.svgNodes) {
        const span = spanFactor * v._dataValue;
        v.$arcSpan(span);
        v.$startAngle(prevStartAngle);
        v.__renderPath();
        prevStartAngle = prevStartAngle + span;
      }
    } // action
  } // return
}

export function $arcEquiSpan(data) {
  return {
    name: "arcEquiSpan",
    data,
    action(visuals) {
      const span = this.data / visuals.svgNodes.length;

      let prevStartAngle = 0;
      for (let v of visuals.svgNodes) {
        v.$arcSpan(span);
        v.$startAngle(prevStartAngle);
        v.__renderPath();
        prevStartAngle = prevStartAngle + span;
      }
    }
  }
}

/**
  An offset added between each subsequent arc. It changes the startAngle of
  subsequent arcs which creates a gap between each arc.

  @function $arcSpanOffset
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
  An inset amount that is removed from the span of each arc.
  It changes the startAngle and span creating a gap between each arc.

  @function $arcSpanInset
  @param {Number} data - the gap added between each arc.

  @return {Object}

  Note:
    $arcSpanInset changes the overall length of the arc (i.e. the $arcSpan()).
*/
export function $arcSpanInset(data) {
  return {
    name: "arcSpanOffset",
    data,
    action(visuals) {
      let nextStartAngle = this.data;

      for (let v of visuals.svgNodes) {
        const arcSpan = v.$arcSpan();

        v.$startAngle(nextStartAngle);
        v.$arcSpan(arcSpan - this.data * 2);

        v.__renderPath();
        nextStartAngle += arcSpan;
      }
    } // action
  } // return
}

/**
  Determines the span of each arc based on the unit data (supplied in degrees).

  @function $arcSpanUnit
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

  @function $arcRadiusOffset
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
        v.__renderPath();
        x = x + this.data;
      }
    } // action
  } // return
}

/**
  Sets the radius each arc

  @function $arcRadius

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
        v.__renderPath();
      }
    } // action
  } // return
}

/**
 * Scales the radius of each arc by the specified amount
 *
 * @function $arcMaxRadius
 *
 * @param {Number} data - The maximum amount to scale the different radii
 *
 * @return {Object}
 */
export function $arcMaxRadius(data) {
  return {
    name: "arcMaxRadius",
    data,
    action(visuals) {
      for (let v of visuals.svgNodes) {
        const newRadius = this.data * v._dataValue;
        v.$radius(newRadius);
        v.__renderPath();
      }
    }
  }
}
/**
 * Offset an element along the center-most radial line
 *
 * @function $radialOffset
 *
 * @param {*} data
 * @param {Integer} indexOfItemToOffset - If null, all points are radially offset.
 * Otherwise, only radially offset the point at the specific index
 *
 * @return {Object}
 */
export function $radialOffset(data, indexOfItemToOffset = null) {
  return {
    name: "radialOffset",
    data,
    action(visuals) {
      Array.from(visuals.svgNodes).forEach((v, currentNodeIndex) => {
        if ((indexOfItemToOffset == null) || (currentNodeIndex == indexOfItemToOffset)) {
          const radialCenter = v.$radialCenter(this.data);

          v.$x(radialCenter.x);
          v.$y(radialCenter.y);

          v.__renderPath();
        }
      });
    }
  }
}