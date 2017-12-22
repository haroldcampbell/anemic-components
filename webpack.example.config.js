const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    ancui: [
      './lib/utils.js',
      './lib/ancui-core.js',
      './lib/ancui-data.js',
      './lib/ancui-intents.js',
      './lib/ancui-pipeline.js',
      './lib/ancui-visuals.js',
    ],
    script: [
      './examples/src/examples-arc.js',
      './examples/src/examples-bar.js',
      './examples/src/examples-ellipse.js',
      './examples/src/script.js',
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['examples/dist']),
  ],

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'examples/dist')
  }
};
