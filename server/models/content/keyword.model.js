/**
 * Created by joehua on 7/6/15.
 */

'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var baseModelPlugin = require('./../base-model-plugin');

var KeywordSchema = new Schema({
    text: {type: String, required: true},
    matchType: {type: String, required: true, enum: ['Broad', 'Phrase', 'Exact']},
    usSearch: {type: Number, required: true}
});

KeywordSchema.plugin(baseModelPlugin);
var Keyword = mongoose.model('Keyword', KeywordSchema);

module.exports = Keyword;