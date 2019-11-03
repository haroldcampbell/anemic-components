const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './lib/ancui.js',

  plugins: [
    new CleanWebpackPlugin(['www/assets/dist']),
  ],

  output: {
    path: path.resolve(__dirname, 'www/assets/dist'),
    filename: 'ancui.js',
    library: 'ancui',
    libraryTarget: 'umd',
  }
}
