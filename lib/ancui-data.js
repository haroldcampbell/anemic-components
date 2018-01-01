import {$isTruthy} from './utils.js'

/**
 * @function $data
 * @param {Array} data - an array of values (e.g [1,4,5,8])
 * @param {String} targetAttr - the attribute to which the data is applied. (e.g. width, height, radius, etc.)
 * @return {Object}
 */
export function $data(data, targetAttr = null) {
  return {
    type: "data",
    target: targetAttr,
    _maxData: null,
    _normalizedData: null,
    data,

    rawData() {
      return this.data;
    },

    /* @return {number} - Zero or the length of the data array.*/
    itemCount() {
      if ($isTruthy(this.data)) {
        return this.data.length;
      }
      return 0;
    },

    /* @return {number} - The max value in newData. The max value is also
    assigned to this._maxData */
    __findMax(newData) {
      let newMax = Math.max(...newData);

      if (!$isTruthy(this._maxData)) {
        this._maxData = newMax
      } else if (newMax > this.maxData) {
        this._maxData = newMax
      }
      return this._maxData;
    },

    /* @return {number} - The max value in values array.*/
    max() {
      if ($isTruthy(this._maxData)) {
        /* Return the cached value if it exists. */
        return this._maxData;
      }
      return this.__findMax(data);
    },

    /* @return {Array} - An array of normalized values (i.e. between 0 t0 1.0).*/
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
    },

    appendDataStart(newData) {
      let maxData = this.__findMax(newData);

      // append newData to the existing raw data
      this.data.push(...newData);

      newData.forEach(d => {
        // normalize and add newData to the end
        let n = d / maxData;
        this._normalizedData.push(n);
      });

      return this._normalizedData;
    },

    appendDataEnd(newData) {
      let maxData = this.__findMax(newData);

      // insert newData onto the start of the existing raw data
      this.data.unshift(...newData);

      newData.forEach(d => {
        // normalize and add newData to the start
        let n = d / maxData;
        this._normalizedData.unshift(n);
      });

      return this._normalizedData;
    },
  };
}
