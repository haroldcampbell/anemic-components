module.exports = function(config){
    config.set({

        basePath : '../',

        files : [
          'lib/utils.js'
          ,'lib/ancui-core.js'
          ,'lib/ancui-data.js'
          ,'lib/ancui-intents.js'
          ,'lib/ancui-pipeline.js'
          ,'lib/ancui-visuals.js'
          ,'test/unit/**/*.js'
        ],

        autoWatch : true,

        frameworks: ['jasmine'],

        browsers : ['Chrome'],

        plugins : [
            'karma-chrome-launcher',
            'karma-jasmine'
        ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};
