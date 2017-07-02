'use strict';

/**
  @method $flowDirection
  @param {Hash} direction -
  If direction is a Hash, then it should contain either {vertical: true} or {horizontal: true}
*/
function $flowDirection (direction) {
  if(direction["vertical"]) {
    $log("vertical")
  }
  if(direction["horizontal"]) {
    $log("horizontal")
  }

  return {}
}

function $verticalFlow () {
  return {
    type: "flow",
    name: "vertical"
  };
}

/**
 * @method $data
 * @returns {Object} {target, values}
 * target - the attribute to which the data is applied. (e.g. width, height, radius, etc.)
 * values - an array of values (e.g [1,4,5,8])
 */
function $data(values, targetAttr) {
  return {
    type: "data",
    target: targetAttr,
    _maxData: null,
    _normalizedData: null,
    data: values,
    max: function() {
      if ($isTruthy(this._maxData)) {
        return this._maxData;
      }
      this._maxData = Math.max(...values);
      return this._maxData;
    },
    asNormalized: function() {
      if ($isTruthy(this._normalizedData)) {
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

function $labels(valArray) {
  return {
    type: "effect",
    name: "labels",
    data: valArray,
    action: function (visuals) {
      $log(this)
      $log(this.data)
    }
  };
}

// function $offset(val) {
//   return {
//     type: "effect",
//     name: "offest",
//     data: val,
//     action: function (visuals) {
//       // let [first, ...rest] = visuals;
//       // let x = first.$x();
//       //
//       // rest.forEach(v => {
//       //   x = x + this.data;
//       //   v.$x(x);
//       // })
//     }
//   };
// }

/**
  Sets the x value of the visuals
  @method $x
*/
function $x(val) {
  return {
    type: "effect",
    name: "x",
    data: val,
    action: function (visuals) {
      visuals.forEach(v => {
        v.$x(val);
      })
    }
  };
}

/**
  Sets the y value of the visuals
  @method $y
*/
function $y(val) {
  return {
    type: "effect",
    name: "y",
    data: val,
    action: function (visuals) {

      visuals.forEach(v => {
        v.$y(val);
      })
    }
  };
}

/**
  Sets the y-distance between the visuals
  @method $yOffset
*/
function $yOffset(val, frac) {
  return {
    type: "effect",
    name: "yOffset",
    data: val,
    action: function (visuals) {
      // for(let v of visuals) {
      //
      // }
      let [first, ...rest] = visuals;
      let y = first.$y() + first.$height() + val// + val*frac;

      // first.$y(first.$y() + val*frac);

      rest.forEach(v => {
        v.$y(y);
        y = y + val + v.$height()//*frac;
      })
    }
  };
}

function $ryOffset(val) {
  return {
    type: "effect",
    name: "yOffset",
    data: val,
    action: function (visuals) {
      let y = visuals[0].$cy()
      for(let v of visuals) {
        v.$cy(y + v.$ry());
        y = y + val + v.$ry()*2.0
      }
    }
  };
}

function $xOffset(val) {
  return {
    type: "effect",
    name: "xOffset",
    data: val,
    action: function (visuals) {
      let [first, ...rest] = visuals;
      let x = first.$x() + first.$width() + val;

      rest.forEach(v => {
        $log(x)
        v.$x(x);
        x = x + val + v.$width();
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
    action: function (visuals) {
      visuals.forEach(v => {
        if(v._dataProperty != "diameter") {
          return;
        }
        let dd = v._dataValue/2.0;
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
    action: function (visuals) {
      /* Scale the items by the height and align using the max height */
      visuals.forEach(v => {
        if(v._dataProperty != "height") {
          return;
        }

        let h = val * v._dataValue;
        v.$height(h)
          /*
           $y(...) violates the unix principle of "do one thing".
           Maybe I should only scale and not do the aligment.
           */
          // .$y(maxHeight - h);
      })
    }
  };
}

/**
 Scale the width based on the value of the largest item.
 @method $maxWidth
 @param {Number} val - the maximun width to which visuals will be scalled
 */
function $maxWidth(val) {
  return {
    type: "effect",
    name: "maxHeight",
    data: val,
    action: function (visuals) {
      /* Scale the items by the height and align using the max height */
      visuals.forEach(v => {
        if(v._dataProperty != "width") {
          return;
        }

        $log(v._data)
        let h = val * v._data;

        v.$width(h)
          /*
           $x(...) violates the unix principle of "do one thing".
           Maybe I should only scale and not do the aligment.
           */
          // .$x(maxWidth - h);
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
    action: function(visuals){
      visuals.forEach(v => { v.$width(this.data) });
    }
  }
}

function $group(name) {
  return {
    type: "effect",
    name: "group",
    data: name,
    action: function(visuals){
      if(visuals.length == 0)
        return;

      let parent = visuals[0].parentElement
      let g = group(parent, name);

      visuals.forEach(v => {
        g.appendChild(v);
      });
    }
  }
}

function $join() {

}
