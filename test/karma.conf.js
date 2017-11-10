// var webpackConfig = require('../webpack.config');
const ancuiBasePath = "ancuiBasePath";

module.exports = function(config) {
  config.set({

    basePath: '../',

    files: [
      'lib/*.js',
      'test/unit/utils.js',
      'test/unit/intents-*.spec.js',
      'test/unit/pipeline.spec.js',
    ],

    preprocessors: {
      'lib/*.js':['webpack'],
      'test/unit/utils.js': ['webpack'],
      'test/unit/intents-*.spec.js': ['webpack', 'sourcemap'],
      'test/unit/pipeline.spec.js': ['webpack', 'sourcemap'],
    },

    webpack: {
      devtool: 'inline-source-map',
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      noInfo: true,
      stats: {
          chunks: false
      }
    },

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-webpack',
      'karma-sourcemap-loader'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};
