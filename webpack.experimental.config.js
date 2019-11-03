const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    experiments: './www/experimental/src/experiments.js',
  },

  plugins: [
    new CleanWebpackPlugin(['www/experimental/dist']),
  ],

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'www/experimental/dist'),
  }
};
