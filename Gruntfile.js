/**
 * Created by joehua on 7/6/15.
 */
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cucumberjs: {
            options: {
                format: 'html',
                output: 'cucumber-report.html',
                theme: 'bootstrap',
                require: 'features/step_definitions/api'
            },
            features: []
            //my_features: ['features/feature1.feature', 'features/feature2.feature'],
            //my_features: ['features/*'],
            //other_features: {
            //    options: {
            //        output: 'other_report.html'
            //    },
            //    src: ['other_features/feature1.feature', 'other_features/feature2.feature']
            //}
        },
        protractor: {
            options: {
                configFile: "config/protractor.conf.js", // Default config file
                keepAlive: true, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                    // Arguments passed to the command
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-cucumberjs');
    grunt.loadNpmTasks('grunt-protractor-runner');
};
