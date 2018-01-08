const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    examples: [
      './examples/src/examples-arc.js',
      './examples/src/examples-bar.js',
      './examples/src/examples-ellipse.js',
      './examples/src/examples-advanced.js',
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['examples/dist']),
  ],

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'examples/dist'),
  }
};
