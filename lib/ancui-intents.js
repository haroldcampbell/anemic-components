import {
  $isTruthy
} from './utils.js'
import {
  group, getIntents
} from './ancui-core.js'

let __intents = getIntents();

/**
 * @function $noop
 * @param {Callback} callback - An optional callback that is called when
 * the action parameter is triggered for the action.
 *
 * @return {Object} Intent meta-data
 */
__intents.internal.$noop = function(callback) {
  this.items.push({
    type: "effects",
    name: "noop",
    data: null,
    action(visuals) {
      if ($isTruthy(callback)) {
        callback();
      }
    }
  });

  return this;
}

/**
 * Sets the x value of the visuals
 * @function $x
 * @param {Number} data - sets the $x amount for the shape
 * @return {Object} Intent meta-data
 */
__intents.internal.$x = function(data) {
  this.items.push({
    type: "effect",
    name: "x",
    data,
    action(visuals) {
      visuals.svgNodes.forEach(v => {
        v.$x(this.data);
      });
    }
  });

  return this;
}

/**
 * Sets the y value of the visuals
 *
 * @function $y
 * @param {Number} data - sets the $y amount for the shape
 * @return {Object} Intent meta-data
 */
__intents.internal.$y = function(data) {
  this.items.push({
    type: "effect",
    name: "y",
    data,
    action(visuals) {
      visuals.svgNodes.forEach(v => {
        v.$y(this.data);
      });
    }
  });

  return this;
}

/**
 * Sets the rx value of the visuals
 * @function $rx
 * @param {Number} data - sets the $rx amount for the shape
 * @return {Object} Intent meta-data
 */
__intents.internal.$rx = function(data) {
  this.items.push({
    type: "effect",
    name: "rx",
    data,
    action(visuals) {
      visuals.svgNodes.forEach(v => {
        if (v._dataProperty != "diameter") {
          console.log('$rx requires dataProperty: "diameter"')
          return;
        }
        v.$rx(this.data);
      });
    }
  });

  return this;
}

/**
 * Sets the ry value of the visuals
 * @function $ry
 * @param {Number} data - the $ry amount
 * @return {Object} Intent meta-data
 */
__intents.internal.$ry = function(data) {
  this.items.push({
    type: "effect",
    name: "ry",
    data,
    action(visuals) {
      visuals.svgNodes.forEach(v => {
        if (v._dataProperty != "diameter") {
          console.log('$ry requires dataProperty: "diameter"')
          return;
        }
        v.$ry(this.data);
      });
    }
  });

  return this;
}

/**
 * Sets the y-distance between the visuals
 *
 * @function $yOffset
 * @param {Number} data - the vertical offset amount
 * @return {Object} Intent meta-data
 */
__intents.internal.$yOffset = function(data) {
  this.items.push({
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
  });

  return this;
}

/**
 * Sets the vertical offset of the ellipses.
 *
 * @function $ryOffset
 * @param {Number} data
 * @return {Object} Intent meta-data
 */
__intents.internal.$ryOffset = function(data) {
  this.items.push({
    type: "effect",
    name: "ryOffset",
    data,
    action(visuals) {
      let y = visuals.svgNodes[0].$cy();

      for (let v of visuals.svgNodes) {
        if (v._dataProperty != "diameter") {
          console.log('$ryOffset requires dataProperty: "diameter"')
          return;
        }
        v.$cy(y + v.$ry());
        y = y + this.data + v.$ry() * 2.0;
      }
    }
  });

  return this;
}

/**
 * Sets the x-distance between the visuals
 *
 * @function $xOffset
 * @param {Number} data
 * @return {Object} Intent meta-data
 */
__intents.internal.$xOffset = function(data) {
  this.items.push({
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
  });

  return this;
}

/**
 * Sets the horizontal offset of the ellipses.
 * @function $ryOffset
 * @param {Number} data
 * @return {Object} Intent meta-data
 */
__intents.internal.$rxOffset = function(data) {
  this.items.push({
    type: "effect",
    name: "rxOffset",
    data,
    action(visuals) {
      let x = visuals.svgNodes[0].$cx()
      for (let v of visuals.svgNodes) {
        if (v._dataProperty != "diameter") {
          console.log('$rxOffset requires dataProperty: "diameter"')
          return;
        }
        v.$cx(x + v.$rx());
        x = x + this.data + v.$rx() * 2.0
      }
    }
  });

  return this;
}

/**
 * Scales the width and height based on the value of the largest item.
 *
 * @function $max
 * @param {Number} data - the maximum width and height to which visuals will be scalled
 * @return {Object} Intent meta-data
 */
__intents.internal.$max = function(data) {
  this.items.push({
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
  });

  return this;
}

/**
 * Scales the width and height based on the value of the largest ellipse.
 * This is constrained to data with the diameter targetAttr.
 *
 * @function $maxDiameter
 * @param {Number} data - the maximum width and height to which visuals will be scalled
 * @return {Object} Intent meta-data
 */
__intents.internal.$maxDiameter = function(data) {
  this.items.push({
    type: "effect",
    name: "maxDiameter",
    data,
    action(visuals) {
      visuals.svgNodes.forEach(v => {
        if (v._dataProperty != "diameter") {
          console.log('$maxDiameter requires dataProperty: "diameter"')
          return;
        }
        let dd = v._dataValue / 2.0;
        let d = this.data * dd;
        v.$height(d)
        v.$width(d)
      })
    }
  });

  return this;
}

/**
 * Scale the height based on the value of the largest item.
 *
 * @function $maxHeight
 * @param {Number} data - the maximun height to which visuals will be scalled
 * @return {Object} Intent meta-data
 */
__intents.internal.$maxHeight = function(data) {
  this.items.push({
    type: "effect",
    name: "maxHeight",
    data,
    action(visuals) {
      /* Scale the items by the height and align using the max height */
      visuals.svgNodes.forEach(v => {
        if (v._dataProperty != "height") {
          console.log('$maxHeight requires dataProperty: "height"')
          return;
        }

        let h = this.data * v._dataValue;
        v.$height(h)
      });
    }
  });

  return this;
}

/**
 * Scale the width based on the value of the largest item. This intent can
 * *ONLY* be applied to data has a width attribute. See the example below.
 *
 * @function $maxWidth
 *
 * @param {Number} data - the maximun width to which visuals will be scalled
 * @return {Object} Intent meta-data
 * @example
 *   var barsData = $data([50, 20, 30, 10, 50], "width");
 *   container("c4", c => {
 *     c.bars(barsData, [$maxWidth(50), $x(50), $yOffset(30), $height(20)])
 *   })
 */
__intents.internal.$maxWidth = function(data) {
  this.items.push({
    type: "effect",
    name: "maxHeight",
    data,
    action(visuals) {
      visuals.svgNodes.forEach(v => {
        if (v._dataProperty != "width") {
          console.log('$maxWidth requires dataProperty: "width"')
          return;
        }

        let h = this.data * v._dataValue;

        v.$width(h)
      })
    }
  });

  return this;
}

/**
 * Scale the y-coord based on the value of the largest item.
 *
 * @function $maxY
 * @param {Number} data - the maximun y-coord to which visuals will be scalled
 * @return {Object} Intent meta-data
 */
__intents.internal.$maxY = function(data) {
  this.items.push({
    type: "effect",
    name: "maxY",
    data,
    action(visuals) {
      visuals.svgNodes.forEach(v => {
        if (v._dataProperty != "y") {
          console.log('$maxY requires dataProperty: "y"')
          return;
        }

        let y = this.data * v._dataValue;
        v.$y(y)
      })
    }
  });

  return this;
}

/**
 * Scale the stroke based on the value of the largest item.
 *
 * @function $maxStrokeWidth
 * @param {Number} data - the maximun stroke to which visuals will be scalled
 * @return {Object} Intent meta-data
 */
__intents.internal.$maxStrokeWidth = function(data) {
  this.items.push({
    type: "effect",
    name: "maxStroke",
    data,
    action(visuals) {
      visuals.svgNodes.forEach(v => {
        if (v._dataProperty != "strokeWidth") {
          console.log('$maxStrokeWidth requires dataProperty: "strokeWidth"')
          return;
        }

        let y = this.data * v._dataValue;
        v.$strokeWidth(y)
      })
    }
  });

  return this;
}

/**
 * Sets the width of all the visuals.
 *
 * @function $width
 * @param {Number} data - the width of the visual
 * @return {Object} Intent meta-data
 */
__intents.internal.$width = function(data) {
  this.items.push({
    type: "effect",
    name: "width",
    data,
    action(visuals) {
      visuals.svgNodes.forEach(v => {
        v.$width(this.data)
      });
    }
  });

  return this;
}

/**
 * Sets the height of all the visuals.
 *
 * @function $height
 * @param {Number} data - the height of the visuals
 * @return {Object} Intent meta-data
 */
__intents.internal.$height = function(data) {
  this.items.push({
    type: "effect",
    name: "height",
    data,
    action(visuals) {
      visuals.svgNodes.forEach(v => {
        v.$height(this.data)
      });
    }
  });

  return this;
}

/**
 * Aligns all visuals along the bottom of the "y-axis".
 *
 * This method works best if it is called after the $maxHeight(...) method is called,
 * or after the $height() is somehow set.
 *
 * @function $alignBottom
 * @param {number} yBaseline - an optional yBaseline that is used to determine the position the
 * visuals. If this value is not supplied, then the visuals.__data.max() is used.
 * @return {Object} Intent meta-data
 */
__intents.internal.$alignBottom = function(yBaseline) {
  this.items.push({
    type: "effect",
    name: "align",
    action(visuals) {
      let baselineValue = yBaseline || visuals.__data.max();

      /* If the height is already set, then align based on the heigt */
      for (let v of visuals.svgNodes) {
        if ($isTruthy(v.$height())) {
          v.$y(baselineValue - v.$height());
        }
      }
    }
  });

  return this;
}

/**
 * Aligns all visuals along the right of the "x-axis".
 *
 * This method works best if it is called after the $maxWidth(...) method is called,
 * or after the $width() is somehow set.
 *
 * @function $alignRight
 * @param {number} xBaseline - an optional xBaseline that is used to determine the position the
 * visuals. If this value is not supplied, then the visuals.__data.max() is used.
 * @return {Object} Intent meta-data
 */
__intents.internal.$alignRight = function(xBaseline) {
  this.items.push({
    type: "effect",
    name: "align",
    action(visuals) {
      let baselineValue = xBaseline || visuals.__data.max();

      /* If the height is already set, then align based on the heigt */
      for (let v of visuals.svgNodes) {
        if ($isTruthy(v.$width())) {
          v.$x(baselineValue - v.$width());
        }
      }
    }
  });

  return this;
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
__intents.internal.$group = function(name) {
  this.items.push({
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
  });

  return this;
}

/**
 * @function $joinGroupItems
 * @param {Array} groupsArray - An array with the id of the groups that contains
 * the elements that visuals that should be connected.
 * @param {bool} isSmooth - True if line should be curved.
 * @return {Object} Intent meta-data
 */
__intents.internal.$joinGroupItems = function(groupsArray, isSmooth = true) {
  this.items.push({
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
        throw "$joinGroupItems: There are more visuals(" + visuals.svgNodes.length + ") than linePairs(" + linePairs.length + ")"
      }
      for (let index in visuals.svgNodes) {
        let v = visuals.svgNodes[index];
        let {p1, p2} = linePairs[index];
        v.$path(p1, p2, isSmooth);
      }
    }
  });

  return this;
}