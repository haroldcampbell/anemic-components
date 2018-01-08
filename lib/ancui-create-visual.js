import * as utils from './utils.js'

// import {
//     getIntents
// } from './ancui-core.js'

export default function __createVisual (__$visuals, currentContainer) {
    return {
      svgNodes: [],
      __$visuals: __$visuals,
      container: currentContainer,

      __data: null,
      withData(newData) {
        this.__data = newData;
        return this;
      },

      __effects: null,
      getEffects() {
        return this.__effects;
      },

      withEffects(newEffects) {
        this.__effects = newEffects;
        return this;
      },

      __createSVGShapeCallabck: null, // Callback
      withSVGShapeCreator(newSVGShapeCreatorCallback) {
        this.__createSVGShapeCallabck = newSVGShapeCreatorCallback;
        return this;
      },

      __saveSVGShape(dataValue, visual) {
        visual._dataValue = dataValue;
        visual._dataProperty = this.__data.target;

        this.svgNodes.push(visual);
      },

      createShapes() {
        this.svgNodes = [];
        this.__data.asNormalized().forEach(d => {
          let svgShape = this.__createSVGShapeCallabck(this);
          this.__saveSVGShape(d, svgShape);
        });
      },

      removeExistingShapes() {
        this.svgNodes.forEach(s => {
          s.remove();
        });
      },

      applyEffects(effects) {
        if (effects === undefined || effects === null) {
          effects = this.__effects;
        }

        for (let effect of effects) {
          effect.action(this);
        }
      },

      onDataDidChange() {
        this.removeExistingShapes();
        this.createShapes();
        this.applyEffects();
      },

      visibleNode(numVisibleNodes) {

      },

      viewDataFrom(startIndex, visibleDataSet) {

      },
    }
  };