/**
 * Created by joehua on 7/7/15.
 */

'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var baseModelPlugin = require('./../base-model-plugin');

var SpintaxProviderSchema = new Schema({
    name: {type: String, required: true},
    code: {type: String, required: true},
    apiTemplate: {type: String},
    quality: Number,
    _creatorId: {type: Schema.ObjectId, ref: 'User'}
});

SpintaxProviderSchema.plugin(baseModelPlugin);
var SpintaxProvider = mongoose.model('SpintaxProvider', SpintaxProviderSchema);

module.exports = SpintaxProvider;