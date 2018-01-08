const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    experimental: './experimental/src/experimental.js',
  },

  plugins: [
    new CleanWebpackPlugin(['experimental/dist']),
  ],

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'experimental/dist'),
  }
};
