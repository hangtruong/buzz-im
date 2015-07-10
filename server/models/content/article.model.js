/**
 * Created by joehua on 7/6/15.
 */

'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var baseModelPlugin = require('./../base-model-plugin');

var ArticleSpintax = require('./article-spintax.model');

var ArticleSchema = new Schema({
    code: String,
    title: String,
    summary: String, // Plain Text
    body: String, // Markdown
    niche: {
        _id: {type: Schema.ObjectId, ref: 'Niche'},
        code: String,
        name: String
    },
    quality: Number,
    tags: [{
        text: String,
        _id: {type: Schema.ObjectId, ref: 'Tag'}
    }],
    approach: {type: String, enum: ['HowTo', 'Sale', 'Story']},
    canBeUsedForContent: [{type: String, enum: ['Presentation', 'Video', 'Infographic', 'AutoResponse']}],
    uniqueness: {},
    spintaxes: [ArticleSpintax],
    _creatorId: {type: Schema.ObjectId, ref: 'User'}
});

ArticleSchema.plugin(baseModelPlugin);
var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;

