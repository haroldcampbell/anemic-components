import {
  $isTruthy,
} from '../utils'
import {
  group
} from '../nodes/ancui-nodes'

/**
 * @function $noop
 * @param {Callback} callback - An optional callback that is called when
 * the action parameter is triggered for the action.
 *
 * @return {Object} Intent meta-data
 */
export function $noop(callback) {
  return {
    type: "effects",
    name: "noop",
    data: null,
    action(visuals) {
      if ($isTruthy(callback)) {
        callback();
      }
    }
  };
}

/**
  An extension Intent lambda that is called on each visual.

  @function $lambda
  @param {Object} data - this will be passed to the callback lambda.
  @param {Function} callback - Callback function should accept three arguments:
    * The first, the intent itself -  @{this},
    * the current visual - @{v}.
    * the index of the current visual in the visuals.svgNodes - @{index},

    This allows developers to supply their own  custom intents.
    The lambda is called internally like this: fn(this, v, index);

    EXAMPLE:
    let colorsData = ["#DAF7A6", "#FFC300", "#FF5733", "#C70039", "#900C3F"];
    _a.container(viewId, _ => {
      _.bars(_a.$data([21, 11, 5, 7], "y"), [
          _a.$y(100), _a.$height(50), _a.$maxWidth(40), _a.$maxX(40), _a.$xOffset(1),
          _a.$lambda({colors: colorsData}, (intent, v, i) => {
            v.$style(`fill: ${intent.data.colors[i]}`)
          })
        ]);
    }, _a.$id(chartId));
§
  @return {Object}
*/
export function $lambda(data, callback) {
  return {
    name: "lambda",
    data,
    action(visuals) {
      visuals.svgNodes.forEach((v, index) => {
        callback(this, v, index);
      })
    } // action
  } // return
}

/**
 * Sets the x value of the visuals
 * @function $x
 * @param {Number} data - sets the $x amount for the shape
 * @return {Object} Intent meta-data
 */
export function $x(data) {
  return {
    type: "effect",
    name: "x",
    data,
    action(visuals) {
      visuals.svgNodes.forEach(v => {
        v.$x(this.data);
      });
    }
  };
}

/**
 * Sets the y value of the visuals
 *
 * @function $y
 * @param {Number} data - sets the $y amount for the shape
 * @return {Object} Intent meta-data
 */
export function $y(data) {
  return {
    type: "effect",
    name: "y",
    data,
    action(visuals) {
      visuals.svgNodes.forEach(v => {
        v.$y(this.data);
      });
    }
  };
}

/**
 * Shifts the x value of the visuals by the specified margin
 * Best if applied after all the other intents last
 * @function $xMargin
 * @param {Number} data - shifts the $x amount for the shape
 * @return {Object} Intent meta-data
 */
export function $xMargin(data) {
  return {
    type: "effect",
    name: "xMargin",
    data,
    action(visuals) {
      visuals.svgNodes.forEach(v => {
        v.$x(v.$x() + this.data);
      });
    }
  };
}

/**
 * Shifts the y value of the visuals by the specified margin
 * Best if applied after all the other intents last
 * @function $yMargin
 * @param {Number} data - shifts the $y amount for the shape
 * @return {Object} Intent meta-data
 */
export function $yMargin(data) {
  return {
    type: "effect",
    name: "yMargin",
    data,
    action(visuals) {
      visuals.svgNodes.forEach(v => {
        v.$y(v.$y() + this.data);
      });
    }
  };
}

/**
 * Sets the x-distance between the visuals
 * Is independent of the width of the visual
 * @function $xIncrement
 * @param {Number} data
 * @return {Object} Intent meta-data
 */
export function $xIncrement(data) {
  return {
    type: "effect",
    name: "xIncrement",
    data,
    action(visuals) {
      let [first, ...rest] = visuals.svgNodes;
      let x = first.$x() + this.data;

      rest.forEach(v => {
        v.$x(x);
        x = x + this.data;
      });
    }
  };
}

/**
 * Sets the y-distance between the visuals
 * Is independent of the height of the visual
 * @function $yIncrement
 * @param {Number} data
 * @return {Object} Intent meta-data
 */
export function $yIncrement(data) {
  return {
    type: "effect",
    name: "yIncrement",
    data,
    action(visuals) {
      let [first, ...rest] = visuals.svgNodes;
      let y = first.$y() + this.data;

      rest.forEach(v => {
        v.$y(y);
        y = y + this.data;
      });
    }
  };
}

/**
 * Sets the y-distance between the visuals
 *
 * @function $yOffset
 * @param {Number} data - the vertical offset amount
 * @return {Object} Intent meta-data
 */
export function $yOffset(data) {
  return {
    type: "effect",
    name: "yOffset",
    data,
    action(visuals) {
      let [first, ...rest] = visuals.svgNodes;
      let y = first.$y() + first.$height() + this.data;

      rest.forEach(v => {
        v.$y(y);
        y = y + this.data + v.$height();
      });
    }
  };
}

/**
 * Sets the x-distance between the visuals
 * Is affected by the width of the visual
 * @function $xOffset
 * @param {Number} data
 * @return {Object} Intent meta-data
 */
export function $xOffset(data) {
  return {
    type: "effect",
    name: "xOffset",
    data,
    action(visuals) {
      let [first, ...rest] = visuals.svgNodes;
      let x = first.$x() + first.$width() + this.data;

      rest.forEach(v => {
        v.$x(x);
        x = x + this.data + v.$width();
      });
    }
  };
}

/**
 * Scales the width and height based on the value of the largest item.
 *
 * @function $max
 * @param {Number} data - the maximum width and height to which visuals will be scalled
 * @return {Object} Intent meta-data
 */
export function $max(data) {
  return {
    type: "effect",
    name: "max",
    data,
    action(visuals) {
      visuals.svgNodes.forEach(v => {
        let m = this.data * v._dataValue;
        v.$height(m)
        v.$width(m)
      })
    }
  };
}

/**
 * Scale the height based on the value of the largest item.
 *
 * @function $maxHeight
 * @param {Number} data - the maximum height to which visuals will be scaled
 * @return {Object} Intent meta-data
 */
export function $maxHeight(data) {
  return {
    type: "effect",
    name: "maxHeight",
    data,
    action(visuals) {
      /* Scale the items by the height and align using the max height */
      visuals.svgNodes.forEach(v => {
        // if (v._dataProperty != "height") {
        //   console.log('$maxHeight requires dataProperty: "height"')
        //   return;
        // }

        if ($isTruthy(v._dataValue.map)) {
          let values = v._dataValue.map(item => this.data * item.d);

          v.$height(values)
          return
        }

        let h = this.data * v._dataValue;
        v.$height(h)
      });
    }
  };
}

/**
 * Scale the width based on the value of the largest item. This intent can
 * *ONLY* be applied to data has a width attribute. See the example below.
 *
 * @function $maxWidth
 *
 * @param {Number} data - the maximum width to which visuals will be scaled
 * @return {Object} Intent meta-data
 * @example
 *   var barsData = $data([50, 20, 30, 10, 50], "width");
 *   container("c4", c => {
 *     c.bars(barsData, [$maxWidth(50), $x(50), $yOffset(30), $height(20)])
 *   })
 */
export function $maxWidth(data) {
  return {
    type: "effect",
    name: "maxWidth",
    data,
    action(visuals) {
      visuals.svgNodes.forEach(v => {
        // if (v._dataProperty != "width") {
        //   console.log('$maxWidth requires dataProperty: "width"')
        //   return;
        // }

        if ($isTruthy(v._dataValue.map)) {
          let values = v._dataValue.map(item => this.data * item.d);

          v.$width(values)
          return
        }

        let w = this.data * v._dataValue;
        v.$width(w)
      })
    }
  };
}

/**
 * Scale the y-coord based on the value of the largest item.
 *
 * @function $maxY
 * @param {Number} data - the maximum y-coord to which visuals will be scaled
 * @return {Object} Intent meta-data
 */
export function $maxY(data) {
  return {
    type: "effect",
    name: "maxY",
    data,
    action(visuals) {
      visuals.svgNodes.forEach(v => {
        // if (v._dataProperty != "y") {
        //   console.log('$maxY requires dataProperty: "y"')
        //   return;
        // }

        let y = this.data * v._dataValue;
        v.$y(y)
      })
    }
  };
}

/**
 * Scale the x-coord based on the value of the largest item.
 *
 * @function $maxX
 * @param {Number} data - the maximum x-coord to which visuals will be scaled
 * @return {Object} Intent meta-data
 */
export function $maxX(data) {
  return {
    type: "effect",
    name: "maxX",
    data,
    action(visuals) {
      visuals.svgNodes.forEach(v => {
        // if (v._dataProperty != "y") {
        //   console.log('$maxY requires dataProperty: "y"')
        //   return;
        // }

        let x = this.data * v._dataValue;
        v.$x(x)
      })
    }
  };
}

/**
 * Scale the stroke based on the value of the largest item.
 *
 * @function $maxStrokeWidth
 * @param {Number} data - the maximun stroke to which visuals will be scalled
 * @return {Object} Intent meta-data
 */
export function $maxStrokeWidth(data) {
  return {
    type: "effect",
    name: "maxStroke",
    data,
    action(visuals) {
      visuals.svgNodes.forEach(v => {
        // if (v._dataProperty != "strokeWidth") {
        // console.log('$maxStrokeWidth requires dataProperty: "strokeWidth"')
        // return;
        // }

        let y = this.data * v._dataValue;
        v.$strokeWidth(y)
      })
    }
  };
}

/**
 * Sets the width of all the visuals.
 *
 * @function $width
 *
 * @param {Number} data - the width of the visual
 * @param {Bool} autoCenter - attempt to change the width around the x property
 *    Useful for the Rect visual
 *
 * @return {Object} Intent meta-data
 */
export function $width(data, autoCenter=false) {
  return {
    type: "effect",
    name: "width",
    data,
    action(visuals) {
      visuals.svgNodes.forEach(v => {
        v.$width(this.data, autoCenter)
      });
    }
  }
}

/**
 * Sets the height of all the visuals.
 *
 * @function $height
 *
 * @param {Number} data - the height of the visuals
 * @param {Bool} autoCenter - attempt to change the width around the y property
 *    Useful for the Rect visual
 *
 * @return {Object} Intent meta-data
 */
export function $height(data, autoCenter=false) {
  return {
    type: "effect",
    name: "height",
    data,
    action(visuals) {
      visuals.svgNodes.forEach(v => {
        v.$height(this.data, autoCenter)
      });
    }
  }
}

/**
 * Aligns all visuals along the bottom of the "y-axis".
 *
 * This method works best if it is called after the $maxHeight(...) method is called,
 * or after the $height() is somehow set.
 *
 * Note: The $y intent has no effect if called before this intent.
 *
 * @function $alignBottom
 * @param {number} yBaseline - an optional yBaseline that is used to determine the position the
 * visuals. If this value is not supplied, then the visuals.__data.max() is used.
 * @return {Object} Intent meta-data
 */
export function $alignBottom(yBaseline) {
  return {
    type: "effect",
    name: "align",
    action(visuals) {
      let baselineValue = yBaseline || visuals.__data.max();

      /* If the height is already set, then align based on the height */
      for (let v of visuals.svgNodes) {
        if ($isTruthy(v.$height) && $isTruthy(v.$height()) && $isTruthy(v.$height().map)) {
          let values = v.$height().map(item => baselineValue - item);
          v.$y(values);
          continue;
        }

        v.$y(baselineValue - v.$height());
      }
    }
  }
}

/**
 * Aligns all visuals along the left of the "x-axis".
 *
 * This method works best if it is called after the $maxWidth(...) method is called,
 * or after the $width() is somehow set.
 *
 * Note: The $x intent has no effect if called before this intent.
 *
 * @function $alignLeft
 * @param {number} xBaseline - an optional xBaseline that is used to determine the position the
 * visuals. If this value is not supplied, then the visuals.__data.max() is used.
 * @return {Object} Intent meta-data
 */
export function $alignLeft(xBaseline) {
  return {
    type: "effect",
    name: "align",
    action(visuals) {
      let baselineValue = xBaseline || visuals.__data.max();

      /* If the width is already set, then align based on the width */
      for (let v of visuals.svgNodes) {
        if ($isTruthy(v.$width) && $isTruthy(v.$width()) && $isTruthy(v.$width().map)) {
          let values = v.$width().map(item => baselineValue);
          v.$x(values);
          continue;
        }
        v.$x(baselineValue)
      }
    }
  }
}

/**
 * Aligns all visuals along the right of the "x-axis".
 *
 * This method works best if it is called after the $maxWidth(...) method is called,
 * or after the $width() is somehow set.

 * Note: The $x intent has no effect if called before this intent.
 *
 * @function $alignRight
 * @param {number} xBaseline - an optional xBaseline that is used to determine the position the
 * visuals. If this value is not supplied, then the visuals.__data.max() is used.
 * @return {Object} Intent meta-data
 */
export function $alignRight(xBaseline) {
  return {
    type: "effect",
    name: "align",
    action(visuals) {
      let baselineValue = xBaseline || visuals.__data.max();

      /* If the width is already set, then align based on the width */
      for (let v of visuals.svgNodes) {
        if ($isTruthy(v.$width) && $isTruthy(v.$width()) && $isTruthy(v.$width().map)) {
          let values = v.$width().map(item => baselineValue - item);
          v.$x(values);
          continue;
        }

        v.$x(baselineValue - v.$width());
      }
    }
  }
}

/**
 * Adds a group element with the @id set to name.
 *
 * @function $group
 * @param {String} name - the id of the group
 * @return {Object} Intent meta-data
 * @example
 *  // All of the ellipses will be added to a group with an id "e1".
 *  container("c4", c => {
 *   c.ellipses(ellipsesData, [$group("e1")])
 *  })
 */
export function $group(name) {
  return {
    type: "effect",
    name: "group",
    data: name,
    action(visuals) {
      if (visuals.svgNodes.length == 0) {
        return;
      }

      let parent = visuals.svgNodes[0].parentElement;
      let g = group(parent, name);

      visuals.svgNodes.forEach(v => {
        g.appendChild(v);
      });
    }
  }
}

/**
 * @function $joinGroupItems
 * @param {Array} groupsArray - An array with the id of the groups that contains
 * the elements that visuals that should be connected.
 * @param {bool} isSmooth - True if line should be curved.
 * @return {Object} Intent meta-data
 */
export function $joinGroupItems(groupsArray, isSmooth = true) {
  return {
    type: "effect",
    name: "joinGroupItems",
    data: groupsArray,
    action(visuals) {
      if (visuals.svgNodes.length == 0 || groupsArray.length != 2) {
        return;
      }

      let parent = visuals.svgNodes[0].parentElement
      let g1 = parent.querySelector("#" + groupsArray[0])
      let g2 = parent.querySelector("#" + groupsArray[1])

      /* Make a guess that the first group has more childNode */
      let [fistGroup, secondGroup] = [g1.childNodes, g2.childNodes];
      if (g1.childNodes.length < g2.childNodes.length) {
        fistGroup = g2.childNodes;
        secondGroup = g1.childNodes;
      }

      let linePairs = [];
      for (let v1 of fistGroup) {
        for (let v2 of secondGroup) {
          linePairs.push({
            p1: {
              x: v1.$x(),
              y: v1.$y()
            },
            p2: {
              x: v2.$x(),
              y: v2.$y()
            }
          });
        }
      }

      if (visuals.svgNodes.length > linePairs.length) {
        throw new Error("$joinGroupItems: There are more visuals(" + visuals.svgNodes.length + ") than linePairs(" + linePairs.length + ")")
      }

      for (let index in visuals.svgNodes) {
        let v = visuals.svgNodes[index];
        let {
          p1,
          p2
        } = linePairs[index];
        v.$path(p1, p2, isSmooth);
      }
    }
  }
}