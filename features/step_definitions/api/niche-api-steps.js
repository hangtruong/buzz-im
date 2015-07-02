/**
 * Created by joehua on 7/2/15.
 */

var _ = require('underscore');
var chai = require('chai');
var expect = chai.expect;

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

var Niche = mongoose.model('Niche', NicheSchema);

module.exports = function () {
    this.World = require('../support/world').World;

    this.When('I had a list of niches (api)', function (jsonData, callback) {
        if (!mongoose.connection.readyState) {
            mongoose.connect('mongodb://localhost/buzzim-development');
        }

        var json = JSON.parse(jsonData);
        Niche.remove({}).exec()
            .then(function (x) {
                return Niche.create(json);
            })
            .then(function (data) {
                mongoose.connection.close();
                callback();
            });
    });

    this.When(/^I request api with page = (.*), itemsPerPage = (.*), sortDimension = (.*), sortColumn = (.*)$/, function (page, itemsPerPage, sortDimension, sortColumn, callback) {
        var request = require('request');
        request({
                method: 'GET',
                url: 'http://localhost:3000/niches',
                qs: {
                    page: page,
                    itemsPerPage: itemsPerPage,
                    sortDimension: sortDimension,
                    sortColumn: sortColumn
                }

            }, function (err, response, body) {
                if (err) {
                    console.log(err);
                    return;
                }
                returnData = JSON.parse(body);
                callback();
            }
        );
    });

    this.Then(/^I should see the niches as file (.*)$/, function (result, callback) {
        var expectData = JSON.parse(readJson(result));
        var properties = ['code', 'name', 'description', 'createdTime', 'modifiedTime'];
        expect(compare2List(expectData, returnData, properties)).to.be.ok;
        callback();
    });


    function readJson(fileName) {
        return require('fs').readFileSync(__dirname + '/../../sample-data/' + fileName, 'utf8');
    };

    function compare2List(list1, list2, properties) {
        console.log(list1[1]);
        console.log(list2[1]);
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

