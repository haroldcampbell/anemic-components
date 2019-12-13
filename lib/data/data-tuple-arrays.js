import {
    $isTruthy,
    $isEmpty,
    copyProps
} from '../utils'

/* return {number} - The minimum number of data items in each item of the data.

    Imagine data like the following:
    [
        [10, 5],           // 2 items
        [15, 5, 8],        // 3 items
        [5, 0],            // 2 items
        [20, 10, 10, 14]   // 4 items
    ]

    The arity returned will be 2 as that's minimum number of nested items across
    all of the data.
*/
function findArity(data) {
    if ($isEmpty(data)) {
        return 0;
    }

    let itemCounts = [];

    for (let index = 0; index < data.length; index++) {
        itemCounts.push(data[index].length);
    }

    return Math.min(...itemCounts);
}

/* @return {number} - The max value in newData. */
function findMax(data, index, oldMax = Number.NEGATIVE_INFINITY) {
    let items = data.map(i => i[index])

    return Math.max(...items, [oldMax]);
}

/* @return {number} - The min value in newData. */
function findMin(data, index, oldMin = Number.POSITIVE_INFINITY) {
    let items = data.map(i => i[index])

    return Math.min(...items, [oldMin]);
}

/**
 * bindWindowingActions functions are used to allow us to scroll through the data
 * and potentially clip some of the data from view.
 * @param {*} dataObj
 * @param {*} data
 */
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

        _resetCachedValues() {
            this._clippedData = null; // Reset cached values
            this._activeDataItems = null;
        },

        activeDataItems() {
            if ($isTruthy(this._activeDataItems)) {
                return this._activeDataItems;
            }

            this._activeDataItems = this._isClippingData ? this._asClipped() : this._asNormalized();

            return this._activeDataItems;
        },

        /* @return {Number} - The un-normalized value at the specified index */
        rawDataItem(index) {
            return this.data[index]
        },

        onDataChanged() {
            this._resetCachedValues();

            if ((this._onDataChangedCallback == null) || (typeof this._onDataChangedCallback != "function")) {
                return;
            }
            this._onDataChangedCallback();
        },

        withVisibleItems(numVisibleItems, startFrom = 0) {
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
 *  Represents an array of data times. Each data item is a tuple of values.
 *
 * @function $multiData
 *
 * @param {Array} data - an array of values (e.g [[1,3],[4,10],[5,11],[8,4]])
 * @param {String} targetAttr - the attribute to which the data is applied. (e.g. width, height, radius, etc.)
 *
 *  @return {Object}
 */
export function $multiData(data, targetAttr = null) {
    let dataObj = {
        type: "multi-data",
        target: targetAttr,
        _maxData: null,
        _normalizedData: null,
        _arity: null,
        _summedData: null,
        data,

        rawData() {
            return this.data;
        },

        rawItemAtIndex(index) {
            return this.data[index]
        },

        /* @return {number} - Zero or the length of the data array.*/
        itemCount() {
            if ($isTruthy(this.data)) {
                return this.data.length;
            }
            return 0;
        },

        /* @return {number} - The minimum length of the nested items.
            See above findArity for more details.
        */
        dataArity() {
            if ($isTruthy(this._arity)) {
                /* Return the cached value if it exists. */
                return this._arity;
            }

            this._arity = findArity(this.data);

            return this._arity
        },

        /* @return {Array} - An array of normalized array values (i.e. between 0 t0 1.0).*/
        _asNormalized() {
            if ($isTruthy(this._normalizedData)) {
                /* Return the cached value if it exists. */
                return this._normalizedData;
            }

            this._normalizedData = [];
            let maxDataArr = this.max();
            const arity = this.dataArity();

            this.data.forEach(d => {
                let n = [];
                for (let index = 0; index < arity; index++) {
                    n[index] = d[index] / maxDataArr[index];
                }
                this._normalizedData.push(n);
            })

            return this._normalizedData;
        },

        /** @return {Number} - The sum of all the raw data items */
        summedData() {
            if ($isTruthy(this._summedData)) {
                /* Return the cached value if it exists. */
                return this._summedData;
            }

            this._summedData = [];
            const arity = this.dataArity();

            for (let index = 0; index < arity; index++) {
                this._summedData[index] = 0
            }

            this.data.forEach(d => {
                for (let index = 0; index < arity; index++) {
                    this._summedData[index] += d[index];
                }
            })

            return this._summedData;
        },

        /* @return {Array} - The max value in values array.*/
        max() {
            if ($isTruthy(this._maxData)) {
                /* Return the cached value if it exists. */
                return this._maxData;
            }

            this._maxData = [];
            const arity = this.dataArity();

            for (let index = 0; index < arity; index++) {
                this._maxData.push(findMax(this.data, index));
            }

            return this._maxData;
        },

        /* @return {number} - The min value in values array.*/
        min() {
            if ($isTruthy(this._minData)) {
                /* Return the cached value if it exists. */
                return this._minData;
            }
            this._minData = [];
            const arity = this.dataArity();

            for (let index = 0; index < arity; index++) {
                this._minData.push(findMin(data, index));
            }

            return this._minData;
        },
    };

    dataObj.appendDataStart = (newData) => dataAppendDataStart(dataObj, newData);
    dataObj.appendDataEnd = (newData) => dataAppendDataEnd(dataObj, newData);

    bindWindowingActions(dataObj, data);

    return dataObj;
}

function dataAppendDataStart(dataObj, newData) {
    if (findArity(newData) != dataObj.dataArity()) {
        // If the new data has a different arity then exit
        return dataObj._asNormalized();
    }
    // append newData to the start existing raw data
    dataObj.data.unshift(...newData);

    // TODO: This is very expensive as it's recalculating the normalized data
    dataObj._normalizedData = null;
    dataObj._asNormalized();
    dataObj.onDataChanged();

    return dataObj._normalizedData;
}

function dataAppendDataEnd(dataObj, newData) {
    if (findArity(newData) != dataObj.dataArity()) {
        // If the new data has a different arity then exit
        return dataObj._asNormalized();
    }

    // insert newData onto the end of the existing raw data
    dataObj.data.push(...newData);

    // TODO: This is very expensive as it's recalculating the normalized data
    dataObj._normalizedData = null;
    dataObj._asNormalized();
    dataObj.onDataChanged();

    return dataObj._normalizedData;
}