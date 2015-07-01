/**
 * Created by joehua on 6/2/15.
 */
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    framework: 'cucumber',
    specs: [
        '../features/**/*.feature'
    ],
    baseUrl: 'http://localhost:8090/client',
    cucumberOpts: {
        require: '../features/step_definitions',
        format: 'pretty',
        tags: "@api"
    },
    capabilities: {
        'browserName': 'chrome'
    },
    chromeOnly: true
};