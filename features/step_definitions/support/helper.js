/**
 * Created by joehua on 7/4/15.
 */

var Q = require('q');
var mongoose = require('mongoose');
var fs = require('fs');
var config = require('../../../config/config');

module.exports.insertNiche = function (json) {
    if (!mongoose.connection.readyState) {
        mongoose.connect(config.db);
    }
    var Niche = require('../../../server/models/content/niche.model.js');
    return Niche.remove({}).exec()
        .then(function () {
            return Q.denodeify(Niche.collection.insert(json));
        })
        .then(function () {
            mongoose.connection.close();
        });
}

module.exports.insertArticles = function (articles) {
    // TODO should be via api
    if (!mongoose.connection.readyState) {
        mongoose.connect(config.db);
    }
    var Article = require('../../../server/models/content/article.model.js');
    return Article.remove({}).exec()
        .then(function () {
            return Q.denodeify(Article.collection.insert(articles)); // How this work?
        })
        .then(function () {
            mongoose.connection.close();
        });
}

module.exports.readSampleFile = function (filePath) {
    var readFile = Q.denodeify(fs.readFile);
    return readFile(__dirname + '/../../sample-data/' + filePath, 'utf8');
};

module.exports.compare2List = function (list1, list2, properties) {
    if (list1.length != list2.length)
        return false;
    for (var i = 0; i < list1.length; i++) {
        for (var j = 0; j < properties.length; j++) {
            var prop = properties[j];
            if (list1[i][prop] !== list2[i][prop]) {
                console.log(i + " / " + list1[i][prop] + " / " + list2[i][prop]);
                return false;
            }
        }
    }
    return true;
};

module.exports.resolvePromise = function (obj) {
    var deferred = Q.defer();
    deferred.resolve(obj);
    return deferred.promise;
};