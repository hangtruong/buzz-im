/**
 * Created by joehua on 6/2/15.
 */
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    framework: 'cucumber',
    specs: [
        '../features/**/*.feature'
    ],
    cucumberOpts: {
        require: '../features/step_definitions',
        format: 'pretty',
        tags: "@niche-ui"
    },
    capabilities: {
        'browserName': 'chrome'
    },
    chromeOnly: true
};