/**
 * Sets the text-size value of the visuals
 * @function $textSize
 * @param {number} data
 * @param {number} xOffset
 * @param {number} yOffset
 * @return {Object} Intent meta-data
 */
export function $textSize(data, xOffset = 0, yOffset = 0) {
    return {
        type: "effect",
        name: "data",
        data,
        action(visuals) {
            visuals.svgNodes.forEach(v => {
                v.$fontSize(this.data);
                v.$x(v.$x() + xOffset);
                v.$y(v.$y() + yOffset);
            });
        }
    };
}

/**
 * Sets the text value of the visuals based on the raw data value
 * @function $dataItem
 * @return {Object} Intent meta-data
 */
export function $rawDataValue() {
    return {
        type: "effect",
        name: "data",
        action(visuals) {
            visuals.svgNodes.forEach(v => {
                v.$text(v._rawDataValue);
            });
        }
    };
}

/**
 * Sets the text value of the visuals based index of the data value
 * @function $dataIndex
 * @param {number} offset
 * @return {Object} Intent meta-data
 */
export function $dataIndex(offset = 0) {
    return {
        type: "effect",
        name: "data",
        action(visuals) {
            visuals.svgNodes.forEach(v => {
                v.$text(v._dataIndex + offset);
            });
        }
    };
}