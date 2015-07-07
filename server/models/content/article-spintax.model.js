/**
 * Created by joehua on 7/6/15.
 */

'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var baseModelPlugin = require('./../base-model-plugin');

var ArticleSpintaxSchema = new Schema({
    spintaxProvider: {
        name: String,
        _id: {type: Schema.ObjectId, ref: 'SpintaxProvider'},
        quality: Number // Spun Quality
    },
    title: String,
    summary: String,
    body: String
});

ArticleSpintaxSchema.plugin(baseModelPlugin);
var ArticleSpintax = mongoose.model('ArticleSpintax', ArticleSpintaxSchema);

module.exports = ArticleSpintax;