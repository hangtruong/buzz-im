"use strict";

require("harmonize")();

process.env.NODE_ENV = 'test';
var config = require('../../../config/config');

var featureHooks = function () {
    var server;
    this.registerHandler('BeforeFeatures', function (event, callback) {
        var http = require('http');
        var app = require('../../../config/koa'); // TODO Better way to invoke Koa, find out why this prevent the test wait 60s to exit
        server = http.createServer(app.callback());
        console.log('Start Server at port ' + config.port);
        server.listen(config.port);
        callback();
    });

    this.registerHandler('AfterFeatures', function (event, callback) {
        console.log('Close Server');
        callback();
    });
};

module.exports = featureHooks;