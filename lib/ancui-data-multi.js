import {
    $isTruthy,
    $isEmpty,
    copyProps
} from './utils'

const normalizeData = (data, maxItem) => {
    let normalized = [];
    data.forEach(d => {
        let n = d / maxItem;
        normalized.push(n);
    })
    return normalized;
}

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
const findArity = (data) => {
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
const findMax = (data, index, oldMax = Number.NEGATIVE_INFINITY) => {
    let items = data.map(i => i[index])

    return Math.max(...items, [oldMax]);
}

/* @return {number} - The min value in newData. */
const findMin = (data, index, oldMin = Number.POSITIVE_INFINITY) => {
    let items = data.map(i => i[index])

    return Math.min(...items, [oldMin]);
}

const bindAppendActions = (dataObj) => {
    const actions = {

        appendDataStart(newData) {
            if (findArity(newData) != this.dataArity()) {
                // If the new data has a different arity then exit
                return this._asNormalized();
            }
            // append newData to the start existing raw data
            this.data.unshift(...newData);

            // TODO: This is very expensive as it's recalculating the normalized data
            this._normalizedData = null;
            this._asNormalized();
            this.onDataChanged();

            return this._normalizedData;
        },

        appendDataEnd(newData) {
            if (findArity(newData) != this.dataArity()) {
                // If the new data has a different arity then exit
                return this._asNormalized();
            }

            // insert newData onto the end of the existing raw data
            this.data.push(...newData);

            // TODO: This is very expensive as it's recalculating the normalized data
            this._normalizedData = null;
            this._asNormalized();
            this.onDataChanged();

            return this._normalizedData;
        },
    }

    copyProps(actions, dataObj)
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
 * @function $multiData
 * @param {Array} data - an array of values (e.g [[1,3],[4,10],[5,11],[8,4]])
 * @param {String} targetAttr - the attribute to which the data is applied. (e.g. width, height, radius, etc.)
 * @return {Object}
 */
export function $multiData(data, targetAttr = null) {
    let dataObj = {
        type: "multi-data",
        target: targetAttr,
        _maxData: null,
        _normalizedData: null,
        _arity: null,
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

    bindAppendActions(dataObj);
    bindWindowingActions(dataObj, data);

    return dataObj;
}