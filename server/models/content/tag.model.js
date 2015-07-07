/**
 * Created by joehua on 7/6/15.
 */

'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var baseModelPlugin = require('./../base-model-plugin');

var TagSchema = new Schema({
    text: {type: String, required: true},
    count: {type: Number, required: true},
    _creatorId: {type: Schema.ObjectId, ref: 'User'}
});

TagSchema.plugin(baseModelPlugin);
var Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;