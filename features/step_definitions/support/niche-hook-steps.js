/**
 * Created by joehua on 7/1/15.
 */

var nicheHooks = function () {
    this.Before("@niche", function (callback) {
        console.log('Start @niche before hook');
        var request = require('request');
        request({
                method: 'DELETE',
                url: 'http://localhost:3000/niches/clear'
            }, function (err, response, body) {
                if (err) {
                    console.log(err);
                    return;
                }
                callback();
            }
        );
    });
};

module.exports = nicheHooks;