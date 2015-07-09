/**
 * Created by joehua on 7/2/15.
 */

var _ = require('underscore');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var request = require('request');
var config = require('../../../config/config');
var helper = require('../support/helper');
module.exports = function () {
    this.World = require('../support/world').World;
    chai.use(chaiAsPromised);
    var expect = chai.expect;
    // Hooks for each scenario exec
    //require('../support/niche-hook-steps')(this);

    this.Given(/^I had a list of niches like "([^"]*)"$/, function (fileName, callback) {
        // Before each scenario, delete data init then insert data init via mongoose
        // TODO maybe refactor using Before, After hook via api POST /niches/bulk and DELETE /niches/bulk
        console.log('Hook before start scenario');
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
                    url: config.urlEndpoint + '/niches',
                    qs: paramJson
                }, function (err, response, body) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        returnData = JSON.parse(body);
                    }
                    callback();
                }
            );
        });

    this.Then(/^I should see the niches as file (.*)$/, function (fileResult, callback) {
        // TODO test case default request, config fulltext search in MongoDB via script
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
        var url = config.urlEndpoint + '/niches/' + nicheSlug;
        request({
                method: 'GET',
                url: url
            }, function (err, response, body) {
                if (err) {
                    console.log(err);
                    callback();
                }
                else {
                    resStatusCode = response.statusCode;
                    resData = body;
                    callback();
                }
            }
        );
    });

    this.Then(/^I should see single niche response with status_code = (.*)$/, function (statusCode, callback) {
        expect(resStatusCode).to.equal(parseInt(statusCode));
        callback();
    });

    this.When(/^I request api DELETE \/niches\/niche_slug with niche_slug = (.*)$/, function (nicheSlug, callback) {
        var url = config.urlEndpoint + '/niches/' + nicheSlug;
        request({
                method: 'DELETE',
                url: url
            }, function (err, response, body) {
                if (err) {
                    console.log(err);
                    callback();
                }
                else {
                    resStatusCode = response.statusCode;
                    callback();
                }
            }
        );
    });

    this.Then(/^I should see api to delete a niche exist$/, function (callback) {
        expect(resStatusCode).not.to.equal(parseInt(404));
        callback();
    });

    this.Then(/^I should see result like status_code = (.*)$/, function (statusCode, callback) {
        expect(resStatusCode).to.equal(parseInt(statusCode));
        callback();
    });

    this.Then(/^I should not get niche with niche_slug = (.*)$/, function (nicheSlug, callback) {
        var url = config.urlEndpoint + '/niches/' + nicheSlug;
        request({
                method: 'GET',
                url: url
            }, function (err, response, body) {
                if (err) {
                    console.log(err);
                    callback();
                }
                else {
                    expect(response.statusCode).to.equal(parseInt(404));
                    callback();
                }
            }
        );
    });

    this.When(/^I request api POST \/niches with data json file like (.*)$/, function (fileName, callback) {
        var url = config.urlEndpoint + '/niches/';
        helper.readSampleFile(fileName)
            .then(function (newNiche) {
                newNiche = JSON.parse(newNiche);
                request({
                        method: 'POST',
                        url: url,
                        headers: [
                            {
                                name: 'content-type',
                                value: 'application/json'
                            }
                        ],
                        json: newNiche
                    }, function (err, response, body) {
                        if (err) {
                            console.log(err);
                            callback();
                        }
                        else {
                            resStatusCode = response.statusCode;
                            resBody = body;
                            callback();
                        }
                    }
                );
            })
            .fail(function (err) {
                callback(err);
            })
            .done();
    });

    this.Then(/^I should see status code created success is (.*)$/, function (statusCode, callback) {
        expect(resStatusCode).to.equal(parseInt(statusCode));
        callback();
    });

    this.Then(/^I should see new niche created success like code = (.*)$/, function (code, callback) {
        expect(resBody.data.code).to.equal(code);
        callback();
    });

    this.When(/^I request api PUT \/niches\/niche_slug with data json file like (.*)$/, function (fileName, callback) {
        helper.readSampleFile(fileName)
            .then(function (niche) {
                niche = JSON.parse(niche);
                var nicheSlug = niche.code;
                var url = config.urlEndpoint + '/niches/' + nicheSlug;
                request({
                        method: 'PUT',
                        url: url,
                        headers: [
                            {
                                name: 'content-type',
                                value: 'application/json'
                            }
                        ],
                        json: niche
                    }, function (err, response, body) {
                        if (err) {
                            console.log(err);
                            callback();
                        }
                        else {
                            resStatusCode = response.statusCode;
                            resBody = body;
                            callback();
                        }
                    }
                );
            })
            .fail(function (err) {
                callback(err);
            })
            .done();
    });

    this.Then(/^I should see PUT \/niches\/niche_slug exist$/, function (callback) {
        expect(resStatusCode).not.to.equal(parseInt(404));
        callback();
    });

    this.Then(/^I should see status code updated success is (.*)$/, function (statusCode, callback) {
        expect(resStatusCode).to.equal(parseInt(statusCode));
        callback();
    });

    this.Then(/^I should see niche updated success like description = (.*)$/, function (description, callback) {
        expect(resBody.data.description).to.equal(description);
        callback();
    });
}
