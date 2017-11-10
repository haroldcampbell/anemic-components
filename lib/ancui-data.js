import {$isTruthy} from './utils.js'

/**
 * @method $data
 * @param {Array} data - an array of values (e.g [1,4,5,8])
 * @param {String} targetAttr - the attribute to which the data is applied. (e.g. width, height, radius, etc.)
 * @returns {Object}
 */
export function $data(data, targetAttr = null) {
  return {
    type: "data",
    target: targetAttr,
    _maxData: null,
    _normalizedData: null,
    data,

    // @returns {number} - Zero or the length of the data array.
    itemCount() {
      if($isTruthy(this.data))
        return this.data.length;

      return 0;
    },

    // @returns {number} - The max value in values array.
    max() {
      if ($isTruthy(this._maxData)) {
        /* Return the cached value if it exists. */
        return this._maxData;
      }
      this._maxData = Math.max(...data);
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
