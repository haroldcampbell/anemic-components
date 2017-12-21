const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: [
    './lib/utils.js',
    './lib/ancui-core.js',
    './lib/ancui-data.js',
    './lib/ancui-intents.js',
    './lib/ancui-intents-arcs.js',
    './lib/ancui-pipeline.js',
    './lib/ancui-visuals.js',
  ],

  plugins: [
    new CleanWebpackPlugin(['dist']),
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ancui.js',
  }
}
