module.exports = function(config){
    config.set({

        basePath : '../',

        files : [
          'lib/utils.js'
          ,'lib/ancui-core.js'
          ,'lib/ancui-intents.js'
          ,'lib/ancui-pipeline.js'
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
