/**
 * Created by joehua on 7/1/15.
 */
var config = require('../../../config/config');
var request = require('request');
var nicheHooks = function (self) {
    //this.Before("@niche-api", function (callback) {
    //    var url = config.urlEndpoint + '/niches/clear';
    //    console.log('Start @niche-api before hook');
    //    console.log(url);
    //    request({
    //            method: 'DELETE',
    //            url: url
    //        }, function (err, response, body) {
    //            if (err) {
    //                console.log(err);
    //                return;
    //            }
    //            callback();
    //        }
    //    );
    //});
    self.Before("@niche-api", function (callback) {
        // TODO request POST /niches/bulk
        console.log("Start before hook @niche-api");
        // Tell Cucumber when we done
        callback();
    });
    self.After("@niche-api", function (callback) {
        // TODO request DELETE /niches/bulk
        console.log("Start after hook @niche-api");
        // Tell Cucumber when we done
        callback();
    });
};

module.exports = nicheHooks;