const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './lib/ancui.js',

  plugins: [
    new CleanWebpackPlugin(['examples/dist']),
  ],

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'examples/dist'),
    library: 'ancui',
  }
};
