/**
 * Created by joehua on 6/28/15.
 */

"use strict";
// features/support/world.js


function WorldFactory(callback) {
    var config = require('../../../config/config');
    var mongoose = require('../../../config/mongoose')();

    var world = {
        config: config,
        mongoose: mongoose
    };

    callback(world); // tell Cucumber we're finished and to use our world object instead of 'this'
};
exports.World = WorldFactory;