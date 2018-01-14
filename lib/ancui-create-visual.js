import {$isTruthy, copyProps} from "./utils"

const bindIntentsActions = (visual) => {
    const intents = {
        __intents: null,

        getIntents() {
            return this.__intents;
        },

        withIntents(newIntents) {
            this.__intents = newIntents;
            return this;
        },

        applyIntents(intents) {
            if (intents === undefined || intents === null) {
                intents = this.__intents;
            }

            for (let intent of intents) {
                intent.action(this);
            }
        }
    }

    copyProps(intents, visual);
}

const bindShapeActions = (visual, container) => {
    const shapes = {
        /* Used to store the shapes that are created */
        svgNodes: [],

        /* The callback must be of the form callback(container) */
        __createSVGShapeCallabck: null,

        __saveSVGShape(dataValue, svgShape) {
            svgShape._dataValue = dataValue;
            svgShape._dataProperty = visual.__data.target;

            this.svgNodes.push(svgShape);
        },

        createShapes() {
            this.svgNodes = [];
            this.__data.activeDataItems().forEach(d => {
                let svgShape = this.__createSVGShapeCallabck(container);
                this.__saveSVGShape(d, svgShape);
            });
        },

        /* The callback that will be used to create the actual shape.
         * The function will be called as callback(container) */
        withSVGShapeCreator(callback) {
            if (typeof callback !== 'function') {
                throw new Error('Invalid callback parameter.' +
                'The callback must be of the form callback(container)')
            }

            this.__createSVGShapeCallabck = callback;
            return this;
        },

        removeExistingShapes() {
            this.svgNodes.forEach(shape => {
                shape.remove();
            });
        }
    }

    copyProps(shapes, visual);
}

export default function __createVisual(__$visuals, currentContainer) {
    const visual = {
        __$visuals: __$visuals,
        container: currentContainer,

        __data: null,
        withData(newData) {
            this.__data = newData;
            if ($isTruthy(this.__data)) {
                this.__data.onDataChangedCallback = () => this.onDataDidChange();
            }
            return this;
        },

        onDataDidChange() {
            this.removeExistingShapes();
            this.createShapes();
            this.applyIntents();
        },
    };

    bindIntentsActions(visual)
    bindShapeActions(visual, currentContainer)

    return visual;
};