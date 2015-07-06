/**
 * Created by joehua on 7/2/15.
 */

var _ = require('underscore');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var request = require('request');
var uriEndpoint = 'http://localhost:3000';
var helper = require('../support/helper');

module.exports = function () {
    this.World = require('../support/world').World;
    this.Given(/^I had a list of niches like "([^"]*)"$/, function (fileName, callback) {
        helper.readSampleFile(fileName)
            .then(function (result) {
                var json = JSON.parse(result);
                return helper.insertNiche(json);
            })
            .then(function () {
                callback();
            })
            .catch(function (err) {
                callback(err);
            })
            .done();
    });


    this.When(/^I request api with page = (.*), itemsPerPage = (.*), sortDimension = (.*), sortColumn = (.*), searchText = (.*)$/
        , function (page, itemsPerPage, sortDimension, sortColumn, searchText, callback) {
            var paramJson = {
                page: page,
                itemsPerPage: itemsPerPage,
                sortDimension: sortDimension,
                sortColumn: sortColumn
            };
            if (searchText != '' || searchText != null) {
                paramJson.searchText = searchText;
            }
            request({
                    method: 'GET',
                    url: uriEndpoint + '/niches',
                    qs: paramJson
                }, function (err, response, body) {
                    if (err) {
                        console.log(err);
                    }
                    else
                        returnData = JSON.parse(body);
                    callback();
                }
            );
        });

    this.Then(/^I should see the niches as file (.*)$/, function (fileResult, callback) {
        helper.readSampleFile(fileResult)
            .then(function (result) {
                var expectData = JSON.parse(result);
                var properties = ['code', 'name', 'description', 'createdTime', 'modifiedTime'];
                var result = helper.compare2List(expectData, returnData, properties);

                expect(helper.resolvePromise(result)).to.be.eventually.ok.and.notify(callback);
            })
            .fail(function (err) {
                callback(err);
            })
            .done();
    });

    this.When(/^I request api GET \/niches\/niche_slug with niche_slug = (.*)$/, function (nicheSlug, callback) {
        var url = uriEndpoint + '/niches/' + nicheSlug;
        console.log(url);
        request({
                method: 'GET',
                url: url ,
            }, function (err, response, body) {
                if (err) {
                }
                else{
                    callback();
                }
            }
        );
    });

    this.Then(/^I should be see single niche response with status_code = (.*)$/, function (statusCode, callback) {
        callback();
    });

    this.When(/^I request api DELETE \/niches\/niche_slug with niche_slug = (.*)$/, function (nicheSlug, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^I should be see result like status_code = (.*)$/, function (statusCode, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

}
