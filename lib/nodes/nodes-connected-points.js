import {
  _$,
  addShapeNode,
} from '../ancui-core.js'

import * as utils from '../utils'


export function connectedPoints(parentId, data) {
  let p = addShapeNode(parentId, null, "line");

  p.$x1 = _$.__attr(p, 'x1');
  p.$y1 = _$.__attr(p, 'y1');

  p.$x2 = _$.__attr(p, 'x2');
  p.$y2 = _$.__attr(p, 'y2');

  p.$strokeWidth = _$.__attr(p, "stroke-width");

  p.$x = _x => connectedX(p, data, _x);
  p.$y = _y => connectedY(p, data, _y);
  p.$width = _w => connectedWidth(p, data, _w);
  p.$height = _h => connectedHeight(p, data, _h);

  return p;
}

const connectedX = (p, data, _x) => {
  if (!utils.$isTruthy(_x)) {
    return p.$x1();
  }

  if (data[0]._dataProperty === "y") {
    p.$x1(_x);
    p.$x2(_x);

    return p;
  }

  p.$x1(_x[0]);
  p.$x2(_x[1]);

  return p;
}

const connectedY = (p, data, _y) => {
  if (!utils.$isTruthy(_y)) {
    return p.$y1();
  }

  if (data[0]._dataProperty === "x") {
    p.$y1(_y);
    p.$y2(_y);

    return p
  }

  p.$y1(_y[0]);
  p.$y2(_y[1]);

  return p;
}

const connectedWidth = (p, data, _w) => {
  if (data[0]._dataProperty === "y") {
    p.$x2(p.$x1() + _w);

    return p;
  }

  p.$x1(_w[0]);
  p.$x2(_w[1]);

  return p;
}

const connectedHeight = (p, data, _h) => {
  if (!utils.$isTruthy(_h)) {
    if (data[0]._dataProperty === "x") {
      return [0, p.$y2() - p.$y1()];
    }
    return [p.$y1(), p.$y2()];
  }

  if (data[0]._dataProperty === "x") {
    p.$y2(p.$y1() + _h);

    return p
  }

  p.$y1(_h[0]);
  p.$y2(_h[1]);

  return p;
}