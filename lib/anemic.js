'use strict';

function $log(message) {
    console.log(message);
}

/**
 * Tests the truthiness of the specified object
 * @param obj
 * @returns {boolean}
 */
function $isTruthy(obj) {
    return !!obj
}

function $id(name) {
  if (typeof name === 'string') {
    return document.getElementById(name);
  }

  if (name.setAttributeNode != null) {
    /* name is an element */
    return name;
  }

  /* No clue */
  return null;
}

let _$ = {
  __attr: function (node, name) {
      return function(val) {
        if (!$isTruthy(val)) {
          /*
            Allows the function to be used as a getter.
          */
          return node.getAttribute(name);
        }

        let att = document.createAttribute(name);
        att.value = val;
        node.setAttributeNode(att);
        return node;
    }
  },
  _id: function(node){
    return this.__attr(node, "id");
  },
  _x: function(node){
    return this.__attr(node, "x");
  },
  _y: function(node){
    return this.__attr(node, "y");
  },
  _style: function(node){
    return this.__attr(node, "style");
  },
  _class: function(node){
    return this.__attr(node, "class");
  },
  _height: function(node){
    return this.__attr(node, "height");
  },
  _width: function(node){
    return this.__attr(node, "width");
  },
  _attr: function(node){
      return function (attrName, val) {

      if(typeof val === 'undefined') {
        /* we only create the attribute if the val is not nil*/
        return node;
      }

      var att = document.createAttribute(attrName);
      att.value = val;
      node.setAttributeNode(att);
      return node;
    }
  }
}

function $node(tag, parentElm) {
  let node = document.createElementNS("http://www.w3.org/2000/svg",tag);

  node.$class = _$._class(node);
  node.$style = _$._style(node);
  node.$height = _$._height(node);
  node.$width = _$._width(node);
  node.$attr = _$._attr(node);

  if($isTruthy(parentElm)) {
    parentElm.appendChild(node);
  }

  return node;
}

function addShape(parentId, id, shape) {
  let parentElm = $id(parentId);

  if(!$isTruthy(parentElm)) {
    /* Fail silently */
    $log("[addShape] Can't find element parent with id:" + parentId)
    return null;
  }

  return $node(shape, parentElm)
  .$attr("id", id);
}

function rect(parentId, id, x, y) {
  let r = addShape(parentId, id, "rect");

  // r.__useAxisOffsets = false;
  r.$x = _$._x(r)
  r.$y = _$._y(r)
  r.$xy = function(_x, _y) {
    r.$x(_x);
    r.$y(_y);

    return r;
  }

  if($isTruthy(x)) {
    r.$x(x)
  }
  if($isTruthy(y)) {
    r.$y(y)
  }

  return r;
}

function g(parentId, id) {
  return addShape(parentId, id, "g");
}

function hline(parentId, id, x, y, width) {
  return addShape(parentId, id, "line")
  .$attr("x1", x)
  .$attr("y1", y)
  .$attr("x2", x + width)
  .$attr("y2", y);
}

function vline(parentId, id, x, y, height) {
  return addShape(parentId, id, "line")
  .$attr("x1", x)
  .$attr("y1", y)
  .$attr("x2", x)
  .$attr("y2", y + height);
}

function line(parentId, id, x1, y1, x2, y2) {
  return addShape(parentId, id, "line")
  .$attr("x1", x1)
  .$attr("y1", y1)
  .$attr("x2", x2)
  .$attr("y2", y2);
}

function elipse(parentId, id) {
  return addShape(parentId, id, "ellipse");
}

/*
* Creates an axes group element
*/
function axes(parentId) {
  let parentNode = $id(parentId);
  let _g = g(parentId);

  _g.$class("axes")

  _g.xaxis = function(yOffset) {
    _g.yOffset = yOffset;
    hline(_g, "x-axis", 1, yOffset, "100%");
    return _g;
  }

  _g.yaxis = function(xOffset) {
    _g.xOffset = xOffset;
    vline(_g, "y-axis", xOffset, 1, "100%");
    return _g;
  }

  parentNode._axis_g = _g;
  return _g;
}

/** --- */

function $values(valArray) {
  return {
    type: "data",
    name: "values",
    data: valArray
  };
}

function $labels(valArray) {
  return {
    type: "effect",
    name: "labels",
    data: valArray,
    action: function(visuals) {
      $log(this)
      $log(this.data)
    }
  };
}

function $xOffset(val) {
  return {
    type: "effect",
    name: "xOffest",
    data: val,
    action: function(visuals) {
      let [first, ...rest] = visuals;
      let x = first.$x();

      rest.forEach(v => {
        x = x + this.data;
        v.$x(x);
      })
    }
  };
}

/**
  Scale the height and algin based on the height of the largest item.
*/
function $maxHeight(val) {
  return {
    type: "effect",
    name: "maxHeight",
    data: val,
    action: function(visuals) {
      /* Get the max item */
      let maxHeight = val * visuals.reduce(function(a, b) {
        if (a.$height == null)
          return b.$height();

        return Math.max(a.$height(), b.$height());
      })
      /* Scale the items by the height and align using the max height */
      visuals.forEach(v => {
        let h = val * v.$height();

        v.$height(h)
        /*
          $y(...) violates the unix principle of "do one thing".
          Maybe I should only scale and not do the aligment.
        */
        .$y(maxHeight - h);
      })
    }
  };
}

function $group() {

}

function $join() {

}

let __$visuals = {
  name: "visuals",
  nodes: {},
  $verticalFlow: function() {
    return this;
  },

  /*
    New method notation for the definition object properties.

    OLD:
      {
        foo: function(array) {...},
        bars: function(array) {...}
      }
    NEW:
      {
        foo(array) {...},
        bars(array) {...}
      }
  */
  bars(arry) {
    let w = 20;
    let visuals = [];
    let effects = {};

    arry.forEach(x => {
      switch(x.type) {
        case "data": {
          if(x.name == "values") {
            let maxData = Math.max(...x.data)

            x.data.forEach(d => {
              let h = d / maxData;
              let r = rect(__$visuals.currentContainer)
                .$class("bar")
                .$width(w)
                .$height(h);

                visuals.push(r);
            });
          }
          break;
        }

        case "effect": {
          effects[x.name] = x;
          break;
        }
      }
    });

    let defaultHeight = $maxHeight(50);
    if (!$isTruthy(effects[defaultHeight.name])) {
      effects[defaultHeight.name] = defaultHeight;
    }

    __$visuals.currentContainer.pipleline.push({visuals: visuals, effects:effects});

    return this;
  },

  labels() {

  },

  ellipses() {

    return this;
  },
  lines: function() {

    return this;
  },
  __renderPipleline: function(){
    let pipleline = __$visuals.currentContainer.pipleline;
    let effects = __$visuals.currentContainer.effects;

    /*
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
      Destructuring Assignment
    */
    pipleline.forEach(({visuals, effects}) => {
      for(let effectName in effects) {
        effects[effectName].action(visuals)
      }
    });
  }
};


function container(id, block, parentElm){
  if($isTruthy(__$visuals.nodes[id])) {
    __$visuals.currentContainer = __$visuals.nodes[id];

    return __$visuals;
  }


  let node = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  node.$id = _$._id(node);
  node.$class = _$._class(node);
  node.$style = _$._style(node);
  node.$height = _$._height(node);
  node.$width = _$._width(node);
  node.$attr = _$._attr(node);

  node.$attr("id", id);

  if($isTruthy(parentElm)) {
    parentElm.appendChild(node);
  } else {
    document.body.appendChild(node);
  }

  __$visuals.nodes[id] = node;
  __$visuals.currentContainer = node;
  __$visuals.currentContainer.pipleline = [];

  /*
  https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions
  An arrow function does not create its own this context, so this has its original meaning
  from the enclosing context.
  */
  block(__$visuals);

  __$visuals.__renderPipleline();

  return __$visuals;
}
