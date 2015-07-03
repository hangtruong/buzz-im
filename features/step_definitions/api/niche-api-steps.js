/**
 * Created by joehua on 7/2/15.
 */

var _ = require('underscore');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var Q = require('q');

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NicheSchema = new Schema({
    name: {type: String, required: true},
    code: {type: String, required: true},
    description: String,
    keywords: [{
        text: {type: String, required: true},
        matchType: {type: String, required: true, enum: ['Broad', 'Phrase', 'Exact']},
        usSearch: {type: Number, required: true}
    }],
    createdTime: {type: Date, default: Date.now},
    modifiedTime: Date,
    _creatorId: {type: Schema.ObjectId, ref: 'User'}
});
var Q = require('q');
var Niche = mongoose.model('Niche', NicheSchema);

module.exports = function () {
    this.World = require('../support/world').World;
    this.Given(/^I had a list of niches like "([^"]*)"$/, function (fileName, callback) {
        if (!mongoose.connection.readyState) {
            mongoose.connect('mongodb://localhost/buzzim-development');
        }

        var json;
        var fs = require('fs');
        var readFile = Q.denodeify(fs.readFile);

        readFile(__dirname + '/../../sample-data/' + fileName, 'utf8')
            .then(function (result) {
                json = JSON.parse(result);
            })
            .then(function () {
                return Niche.remove({}).exec();
            })
            .then(function () {
                return Q.denodeify(Niche.collection.insert(json));
            })
            .then(function () {
                mongoose.connection.close();
                callback();
            });
    });

    this.When(/^I request api with page = (.*), itemsPerPage = (.*), sortDimension = (.*), sortColumn = (.*), searchText = (.*)$/
        , function (page, itemsPerPage, sortDimension, sortColumn, searchText, callback) {
            var request = require('request');
            var paramJson ={
                page: page,
                itemsPerPage: itemsPerPage,
                sortDimension: sortDimension,
                sortColumn: sortColumn
            };
            if(searchText != '' || searchText != null){
                paramJson.searchText = searchText;
            }
            request({
                    method: 'GET',
                    url: 'http://localhost:3000/niches',
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
        var fs = require('fs');
        var readFile = Q.denodeify(fs.readFile);
        readFile(__dirname + '/../../sample-data/' + fileResult, 'utf8')
            .then(function (result) {
                var expectData = JSON.parse(result);
                var properties = ['code', 'name', 'description', 'createdTime', 'modifiedTime'];

                var deferred = Q.defer();
                var result = compare2List(expectData, returnData, properties);
                deferred.resolve(result);

                expect(deferred.promise).to.be.eventually.ok.and.notify(callback);
            })
            .fail(function (err) {
                callback(err);
            })
            .done();
    });

    function compare2List(list1, list2, properties) {
        //console.log(list1[1]);
        //console.log(list2[1]);
        if (list1.length != list2.length)
            return false;
        for (var i = 0; i < list1.length; i++) {
            for (var j = 0; j < properties.length; j++) {
                var prop = properties[j];
                if (list1[i][prop] !== list2[i][prop]) {
                    console.log(i + "-" + list1[i][prop] + "-" + list2[i][prop]);
                    return false;
                }
            }
        }
        return true;
    }
}
