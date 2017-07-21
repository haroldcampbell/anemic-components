exports.config = {
    allScriptsTimeout: 11000,

    specs: [
        'e2e/*.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },

    chromeOnly: true,

    baseUrl: 'http://localhost:8001/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 3000000
    }
};
