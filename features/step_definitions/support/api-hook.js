/**
 * Created by joehua on 6/28/15.
 */

"use strict";

var apiHooks = function () {
    this.World = require('../support/world').World;
    this.Before("@api", function (callback) {
        callback();
    });

    this.After("@api", function (callback) {
        var Niche = this.mongoose.model('Niche');
        Niche.collection.remove({}, function (error) {
            if (error)
                console.log(error);
            else
                console.log('success');
        });
        callback();
    });
};

module.exports = apiHooks;