const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    examples: [
      './www/examples/src/examples-arc.js',
      './www/examples/src/examples-bar.js',
      './www/examples/src/examples-ellipse.js',
      './www/examples/src/examples-segment.js',
      './www/examples/src/examples-polygon.js',
      './www/examples/src/examples-advanced.js',
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['www/examples/dist']),
  ],

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'www/examples/dist'),
  }
};
