module.exports = function(config){
    config.set({

        basePath : '../',

        files : [
          'lib/anemic-utils.js'
          ,'lib/anemic-core.js'
          ,'lib/anemic-intents.js'
          ,'lib/anemic.js'
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
