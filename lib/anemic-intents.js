'use strict';

/**
 * @method $noop
 * @param {Callback} callback - An optional callback that is called when
  the action parameter is triggered for the action.
 */
function $noop(callback) {
  return {
    type: "effects",
    name: "noop",
    data: null,
    action: function(visuals) {
      if ($isTruthy(callback)) {
        callback();
      }
    }
  };
}


/**
 * @method $data
 * @param {Array} values - an array of values (e.g [1,4,5,8])
 * @param {String} targetAttr - the attribute to which the data is applied. (e.g. width, height, radius, etc.)
 * @returns {Object}
 */
function $data(values, targetAttr = null) {
  return {
    type: "data",
    target: targetAttr,
    _maxData: null,
    _normalizedData: null,
    data: values,

    // @returns {number} - The max value in values array.
    max() {
      if ($isTruthy(this._maxData)) {
        /* Return the cached value if it exists. */
        return this._maxData;
      }
      this._maxData = Math.max(...values);
      return this._maxData;
    },

    // @returns {Array} - An array of normalized values (i.e. between 0 t0 1.0).
    asNormalized() {
      if ($isTruthy(this._normalizedData)) {
        /* Return the cached value if it exists. */
        return this._normalizedData;
      }

      this._normalizedData = [];
      let maxData = this.max();

      this.data.forEach(d => {
        let n = d / maxData;
        this._normalizedData.push(n);
      })

      return this._normalizedData;
    }
  };
}

function $labels(data) {
  return {
    type: "effect",
    name: "labels",
    data,
    action: function(visuals) {
      $log(this)
      $log(this.data)
    }
  };
}

/**
  Sets the x value of the visuals
  @method $x
*/
function $x(data) {
  return {
    type: "effect",
    name: "x",
    data,
    action(visuals) {
      visuals.forEach(v => {
        v.$x(data);
      });
    }
  };
}

/**
  Sets the y value of the visuals
  @method $y
*/
function $y(data) {
  return {
    type: "effect",
    name: "y",
    data,
    action(visuals) {
      visuals.forEach(v => {
        v.$y(data);
      });
    }
  };
}

/**
  Sets the y-distance between the visuals
  @method $yOffset
*/
function $yOffset(data) {
  return {
    type: "effect",
    name: "yOffset",
    data,
    action(visuals) {
      let [first, ...rest] = visuals;
      let y = first.$y() + first.$height() + data;

      rest.forEach(v => {
        v.$y(y);
        y = y + data + v.$height()
      });
    }
  };
}

/**
  Sets the vertical offset of the ellipses.
  @method $ryOffset
*/
function $ryOffset(val) {
  return {
    type: "effect",
    name: "ryOffset",
    data: val,
    action(visuals) {
      let y = visuals[0].$cy()
      for (let v of visuals) {
        if (v._dataProperty != "diameter") {
          return;
        }
        v.$cy(y + v.$ry());
        y = y + val + v.$ry() * 2.0
      }
    }
  };
}

/**
  Offset of each visuals by x amount.
  @method $xOffset
*/
function $xOffset(data) {
  return {
    type: "effect",
    name: "xOffset",
    data,
    action(visuals) {
      let [first, ...rest] = visuals;
      let x = first.$x() + first.$width() + data;

      rest.forEach(v => {
        v.$x(x);
        x = x + data + v.$width();
      });
    }
  };
}

/**
  Sets the horizontal offset of the ellipses.
  @method $ryOffset
*/
function $rxOffset(val) {
  return {
    type: "effect",
    name: "rxOffset",
    data: val,
    action(visuals) {
      let x = visuals[0].$cx()
      for (let v of visuals) {
        if (v._dataProperty != "diameter") {
          return;
        }
        v.$cx(x + v.$rx());
        x = x + val + v.$rx() * 2.0
      }
    }
  };
}

/**
 Scales the width and height based on the value of the largest item.
 @method $max
 @param {Number} val - the maximum width and height to which visuals will be scalled
 */
function $max(val) {
  return {
    type: "effect",
    name: "max",
    data: val,
    action(visuals) {
      visuals.forEach(v => {
        let m = val * v._dataValue;
        v.$height(m)
        v.$width(m)
      })
    }
  };
}

/**
 Scales the width and height based on the value of the largest item.
 @method $maxDiameter
 @param {Number} val - the maximum width and height to which visuals will be scalled
 */
function $maxDiameter(val) {
  return {
    type: "effect",
    name: "maxDiameter",
    data: val,
    action(visuals) {
      visuals.forEach(v => {
        if (v._dataProperty != "diameter") {
          return;
        }
        let dd = v._dataValue / 2.0;
        let d = val * dd;
        v.$height(d)
        v.$width(d)
      })
    }
  };
}

/**
 Scale the height based on the value of the largest item.
 @method $maxHeight
 @param {Number} val - the maximun height to which visuals will be scalled
 */
function $maxHeight(val) {
  return {
    type: "effect",
    name: "maxHeight",
    data: val,
    action(visuals) {
      /* Scale the items by the height and align using the max height */
      visuals.forEach(v => {
        if (v._dataProperty != "height") {
          return;
        }

        let h = val * v._dataValue;
        v.$height(h)
      });
    }
  };
}

/**
  Scale the width based on the value of the largest item. This intent can
  *ONLY* be applied to data has a width attribute. See the example below.

  @method $maxWidth
  @param {Number} val - the maximun width to which visuals will be scalled
  @example

    var barsData = $data([50, 20, 30, 10, 50], "width");
    container("c4", c => {
      c.bars(barsData, [$maxWidth(50), $x(50), $yOffset(30), $height(20)])
    })
*/
function $maxWidth(val) {
  return {
    type: "effect",
    name: "maxHeight",
    data: val,
    action(visuals) {
      visuals.forEach(v => {
        if (v._dataProperty != "width") {
          return;
        }

        let h = val * v._dataValue;

        v.$width(h)
      })
    }
  };
}

/**
 Scale the y-coord based on the value of the largest item.
 @method $maxY
 @param {Number} val - the maximun y-coord to which visuals will be scalled
 */
function $maxY(val) {
  return {
    type: "effect",
    name: "maxY",
    data: val,
    action(visuals) {
      visuals.forEach(v => {
        if (v._dataProperty != "y") {
          return;
        }

        let y = val * v._dataValue;
        v.$y(y)
      })
    }
  };
}

/**
 Scale the stroke based on the value of the largest item.
 @method $maxStrokeWidth
 @param {Number} val - the maximun stroke to which visuals will be scalled
 */
function $maxStrokeWidth(val) {
  return {
    type: "effect",
    name: "maxStroke",
    data: val,
    action(visuals) {
      visuals.forEach(v => {
        if (v._dataProperty != "strokeWidth") {
          return;
        }

        let y = val * v._dataValue;
        v.$strokeWidth(y)
      })
    }
  };
}

/**
  Sets the width of all the visuals.
  @method $width
  @param {Number} val - the width of the visuals
*/
function $width(val) {
  return {
    type: "effect",
    name: "width",
    data: val,
    action(visuals) {
      visuals.forEach(v => {
        v.$width(this.data)
      });
    }
  }
}

/**
  Sets the height of all the visuals.
  @method $height
  @param {Number} val - the height of the visuals
*/
function $height(val) {
  return {
    type: "effect",
    name: "height",
    data: val,
    action(visuals) {
      visuals.forEach(v => {
        v.$height(this.data)
      });
    }
  }
}


/**
  Adds a group element with the @id set to name

  @method $group
  @param {String} name - the id of the group
  @example

  // All of the ellipses will be added to a group with an id "e1".

container("c4", c => {
  c.ellipses(ellipsesData, [$group("e1")])
})
*/
function $group(name) {
  return {
    type: "effect",
    name: "group",
    data: name,
    action(visuals) {
      if (visuals.length == 0)
        return;

      let parent = visuals[0].parentElement;
      let g = group(parent, name);

      visuals.forEach(v => {
        g.appendChild(v);
      });
    }
  }
}

/**
  @param {Array} groupsArray - An array with the id of the groups that contains
  the elements that visuals that should be connected.
  @param {bool} isSmooth - True if line should be curved.
*/
function $joinGroupItems(groupsArray, isSmooth = true) {
  return {
    type: "effect",
    name: "joinGroupItems",
    data: groupsArray,
    action(visuals) {
      if (visuals.length == 0 || groupsArray.length != 2)
        return;

      let parent = visuals[0].parentElement
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

      if (visuals.length > linePairs.length) {
        throw "$joinGroupItems: There are more visuals(" + visuals.length + ") than linePairs(" + linePairs.length + ")"
      }
      for (let index in visuals) {
        let v = visuals[index];
        let {
          p1,
          p2
        } = linePairs[index];
        v.$path(p1, p2, isSmooth);
      }
    }
  }
}
