import {
  $isTruthy,
  copyProps
} from './utils.js'

/* TODO: these actions aren't correctly normalizing all of the data
  Old data isn't correctly normalized if the new Data has the new max.
*/
const bindAppendActions = (dataObj) => {
  const actions = {
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
  }

  copyProps(actions, dataObj)
}

const bindWindowingActions = (dataObj, data) => {
  const actions = {
    _startIndex: 0,
    _visibleItems: 0,
    _isClippingData: false,
    _activeDataItems: null,
    _onDataChangedCallback: null,
    _clippedData: null,

    _asClipped() {
      if ($isTruthy(this._clippedData)) {
        return this._clippedData;
      }

      this._asNormalized();
      this._clippedData = [
        ...this._normalizedData.slice(this._startIndex, this._startIndex + this._visibleItems)
      ]

      return this._clippedData;
    },

    activeDataItems() {
      if ($isTruthy(this._activeDataItems)) {
        return this._activeDataItems;
      }

      this._activeDataItems = this._isClippingData ? this._asClipped() : this._asNormalized();

      return this._activeDataItems;
    },

    onDataChanged() {
      if ((this._onDataChangedCallback == null) || (typeof this._onDataChangedCallback != "function")) {
        return;
      }
      this._onDataChangedCallback();
    },

    withVisibleItems(numVisibleItems, startFrom = 0) {
      this._clippedData = null; // Reset cached values
      this._activeDataItems = null;

      this._visibleItems = numVisibleItems;
      this._isClippingData = (this._visibleItems < data.length);
      this._startIndex = startFrom < data.length ? startFrom : 0;
      this.onDataChanged();

      return this
    },

    withDataChangedCallback(callback) {
      if ((callback != null) && (typeof callback == "function")) {
        this._onDataChangedCallback = callback
      }

      return this;
    },
  }

  actions.withVisibleItems(data.length)

  copyProps(actions, dataObj)
}

/**
 * @function $data
 * @param {Array} data - an array of values (e.g [1,4,5,8])
 * @param {String} targetAttr - the attribute to which the data is applied. (e.g. width, height, radius, etc.)
 * @return {Object}
 */
export function $data(data, targetAttr = null) {
  let dataObj = {
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

    /* @return {Array} - An array of normalized values (i.e. between 0 t0 1.0).*/
    _asNormalized() {
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

    /* @return {number} - The max value in values array.*/
    max() {
      if ($isTruthy(this._maxData)) {
        /* Return the cached value if it exists. */
        return this._maxData;
      }
      return this.__findMax(data);
    },
  };

  bindAppendActions(dataObj);
  bindWindowingActions(dataObj, data);

  return dataObj;
}