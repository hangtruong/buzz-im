/**
 * Created by joehua on 6/28/15.
 */

'use strict';

module.exports = function () {
    this.World = require('../support/world').World;
    this.Given(/^I have a list of niches$/, function (nichesJson, callback) {
        var Niche = this.mongoose.model('Niche');
        var niches = JSON.parse(nichesJson);
        for (var i = 0; i < niches.length; i++) {
            var entity = new Niche(niches[i]);
            entity.save(function (err) {
                if (err)
                    console.log(err);
            });
        }
        callback();
    });

    this.When(/^I add a new Niche$/, function (newNicheJson, callback) {
        // TODO Call Web Api
        var Niche = this.mongoose.model('Niche');
        var entity = new Niche(JSON.parse(newNicheJson));
        entity.save(function (err) {
            if (err)
                console.log(err);
        });
        checkCurrentEntities();
        callback();
    });

    this.Then(/^I should see the Niche with code = "([^"]*)" is added$/, function (nicheCode, callback) {
        // TODO Call the Api with nicheCode to check if it exists.
        checkCurrentEntities();
        callback();
    });

    this.When(/^I set search text=(.*), sort=(.*), sort dimension=(.*)$/, function (searchText, sortColumn, sortDimension, callback) {
        this.searchText = searchText;
        this.sortColumn = sortColumn;
        this.sortDimension = sortDimension;

        callback();
    });

    this.Then(/^I will receive a result list like (.*)$/, function (result, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    var checkCurrentEntities = function () {

        var request = require('request');
        request('http://localhost:4000/niches', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var entities = JSON.parse(body);
                for (var i = 0; i < entities.length; i++) {
                    console.log(entities[i].name);
                }
                console.log(entities.length);
            }
            else
                console.log(error);
        });
    };
};