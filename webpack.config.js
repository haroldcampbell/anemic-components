const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './lib/ancui.js',

  plugins: [
    new CleanWebpackPlugin(['dist']),
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ancui.js',
    library: 'ancui',
  }
}
