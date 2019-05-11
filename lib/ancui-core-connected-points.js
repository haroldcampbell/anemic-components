import {
    _$,
    addShape,
} from './ancui-core.js'
import * as utils from './utils'


export function connectedPoints(parentId, data) {
    let p = addShape(parentId, undefined, "line");

    p.$x1 = _$.__attr(p, 'x1');
    p.$y1 = _$.__attr(p, 'y1');

    p.$x2 = _$.__attr(p, 'x2');
    p.$y2 = _$.__attr(p, 'y2');

    p.$strokeWidth = _$.__attr(p, "stroke-width");

    p.$x = function (_x) {
      if (!utils.$isTruthy(_x)) {
        return p.$x1();
      }

      if (data[0]._dataProperty === "y") {
        p.$x1(_x);
        p.$x2(_x);

        return p;
      }

      p.$y1(_x[0]);
      p.$y2(_x[1]);

      return p;
    }

    p.$width = function (_w) {
      if (data[0]._dataProperty === "y") {
        // p.$x1(_w);
        p.$x2(p.$x1() + _w);

        return p;
      }

      // console.log("wiwiwiw", data[0]._dataProperty === "y", _w)
      p.$x1(_w[0]);
      p.$x2(_w[1]);

      return p;
    }

    p.$y = function (_y) {
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

    p.$height = function (_h) {
      if (!utils.$isTruthy(_h)) {
        if (data[0]._dataProperty === "x") {
          return [0, p.$y2() - p.$y1()];
        }
        return [p.$y1(), p.$y2()];
      }

      if (data[0]._dataProperty === "x") {
        // p.$y1(_h);
        p.$y2(p.$y1() + _h);

        return p
      }

      // console.log("setting height", _h)
      p.$y1(_h[0]);
      p.$y2(_h[1]);

      return p;
    }

    // console.log("connectedPoints", data, p)

    return p;
  }