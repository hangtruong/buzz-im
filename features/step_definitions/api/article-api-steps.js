"use strict";
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var request = require('request');
var config = require('../../../config/config');
var helper = require('../support/helper');
module.exports = function () {
    chai.use(chaiAsPromised);
    var expect = chai.expect;
    var requestClient = {
        response: null,
        body: null
    };

    this.Before("@articles-api", function (callback) {
        // TODO request POST /articles/bulk
        callback();
        //helper.readSampleFile(path)
        //    .then(function (result) {
        //        var articles = JSON.parse(result);
        //        //return helper.insertArticles(articles);
        //        var url = config.urlEndpoint + '/articles/bulk';
        //        request({
        //                method: 'POST',
        //                url: url,
        //                headers: [
        //                    {
        //                        name: 'content-type',
        //                        value: 'application/json'
        //                    }
        //                ],
        //                json: articles
        //            }, function (err, response, body) {
        //                if (err)callback(err);
        //            }
        //        );
        //    })
        //    .fail(function (err) {
        //        callback(err);
        //    })
        //    .done(function () {
        //        console.log("Start before hook @articles-api");
        //        callback();
        //    });
    });

    this.After("@articles-api", function (callback) {
        console.log("Start after hook @articles-api");
        requestClient = null;
        expect = null;
        var url = config.urlEndpoint + '/articles/bulk';
        request({
                method: 'DELETE',
                url: url
            }, function (err, response, body) {
                if (err) {
                    callback(err);
                }
                callback();
            }
        );
    });

    /*
     * Articles
     */
    this.Given(/^I had list articles like (.*) and niche_slug like (.*) and request authenticated success$/,
        function (articlesFile, nicheSlug, callback) {
            console.log('Given');
            var path = 'articles-api/' + articlesFile;
            helper.readSampleFile(path)
                .then(function (result) {
                    var articles = JSON.parse(result);
                    var url = config.urlEndpoint + '/articles/bulk';
                    request({
                            method: 'POST',
                            url: url,
                            headers: [
                                {
                                    name: 'content-type',
                                    value: 'application/json'
                                }
                            ],
                            json: articles
                        }, function (err, response, body) {
                            if (err)callback(err);
                            callback();
                        }
                    );
                })
                .fail(function (err) {
                    callback(err);
                })
        });

    this.When(/^I make a request GET \/niches\/niche_slug\/articles to server$/, function (callback) {
        console.log('When');
        var url = config.urlEndpoint + '/articles';
        request({
                method: 'GET',
                url: url
            }, function (err, response, body) {
                if (err) {
                    callback(err);
                }
                requestClient.response = response;
                requestClient.body = JSON.parse(body);
                callback();
            }
        );
    });

    this.Then(/^I should see in response header Content\-Type is (.*), HTTP status code is (.*)$/,
        function (contentType, httpStatusCode, callback) {
            console.log('Then 1');
            expect(requestClient.response.headers['content-type']).to.equal(contentType);
            expect(requestClient.response.statusCode).to.equal(parseInt(httpStatusCode));
            callback();
        });

    this.Then(/^I should see response list articles like (.*)$/, function (expectFile, callback) {
        console.log('Then 2');
        var path = 'articles-api/' + expectFile;
        helper.readSampleFile(path)
            .then(function (result) {
                var articles = JSON.parse(result);
                expect(requestClient.body.length).to.equal(articles.length);
                // Add order by
                //expect(requestClient.body[0].code).to.equal(articles[0].code);
                //expect(requestClient.body[1].code).to.equal(articles[1].code);
                //expect(requestClient.body[2].code).to.equal(articles[2].code);
            })
            .fail(function (err) {
                callback(err);
            })
            .done(function () {
                callback();
            });
    });


    //this.When(/^I make request GET \/niches\/niche_slug\/article with params like page = (.*), item per page = (.*), order by = (.*), sort column = (.*)$/,
    //    function (page, perPage, orderBy, sortColumn, callback) {
    //
    //        // Write code here that turns the phrase above into concrete actions
    //        callback.pending();
    //    });
    //
    //this.Then(/^I should see list articles like file (.*)$/, function (expectFile, callback) {
    //    // Write code here that turns the phrase above into concrete actions
    //    callback.pending();
    //});
    //
    //this.Given(/^I had file like (.*) and request authenticated success$/, function (importArticlesFile, callback) {
    //    // Write code here that turns the phrase above into concrete actions
    //    callback.pending();
    //});
    //
    //this.When(/^I make request POST \/niches\/niche_slug\/articles\/upload$/, function (callback) {
    //    // Write code here that turns the phrase above into concrete actions
    //    callback.pending();
    //});
    //
    //this.Then(/^I should be see result process import like (.*)$/, function (result, callback) {
    //    // Write code here that turns the phrase above into concrete actions
    //    callback.pending();
    //});
    //
    //this.Given(/^I had file like (.*) and request authenticated success$/, function (importKeywordsFile, callback) {
    //    // Write code here that turns the phrase above into concrete actions
    //    callback.pending();
    //});
    //
    //this.When(/^I make request POST \/niches\/niche_slug\/keywords\/upload$/, function (callback) {
    //    // Write code here that turns the phrase above into concrete actions
    //    callback.pending();
    //});
    //
    //this.Given(/^I had article data like (.*) in database and request authenticated success$/, function (updateArticleFile, callback) {
    //    // Write code here that turns the phrase above into concrete actions
    //    callback.pending();
    //});
    //
    //this.When(/^I make request PUT \/articles\/:article_slug$/, function (callback) {
    //    // Write code here that turns the phrase above into concrete actions
    //    callback.pending();
    //});
    //
    //this.Then(/^I should see response body like (.*)$/, function (result, callback) {
    //    // Write code here that turns the phrase above into concrete actions
    //    callback.pending();
    //});
    //
    //this.Given(/^I had articles data like (.*) in database and request authenticated success$/, function (updateArticlesFile, callback) {
    //    // Write code here that turns the phrase above into concrete actions
    //    callback.pending();
    //});
    //
    //this.When(/^I make a request PATCH \/articles\/bulk to server$/, function (callback) {
    //    // Write code here that turns the phrase above into concrete actions
    //    callback.pending();
    //});
    //
    ///*
    // * Tags
    // */
    //this.Given(/^Data tags like (.*) stored in database and request authenticated success$/, function (inputFile, callback) {
    //    // Write code here that turns the phrase above into concrete actions
    //    callback.pending();
    //});
    //
    //this.When(/^I make a request GET \/tags to server$/, function (callback) {
    //    // Write code here that turns the phrase above into concrete actions
    //    callback.pending();
    //});
    //
    //this.Then(/^I should see in response header Content\-Type is (.*), HTTP status code is (.*), response tags like file (.*)$/,
    //    function (contentType, httpStatusCode, expectFile, callback) {
    //
    //        // Write code here that turns the phrase above into concrete actions
    //        callback.pending();
    //    });
    //
    //this.When(/^I make a request GET \/tags\?search=:search with search = (.*)$/, function (searchChar, callback) {
    //    // Write code here that turns the phrase above into concrete actions
    //    callback.pending();
    //});
    //
    //this.Then(/^I should see response tags like file (.*)$/, function (expectFile, callback) {
    //    // Write code here that turns the phrase above into concrete actions
    //    callback.pending();
    //});
}