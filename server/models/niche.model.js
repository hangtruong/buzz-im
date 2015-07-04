/**
 * Created by joehua on 6/27/15.
 */

'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var baseModelPlugin = require('./base-model-plugin');

var NicheSchema = new Schema({
    name: {type: String, required: true},
    code: {type: String, required: true},
    description: String,
    keywords: [{
        text: {type: String, required: true},
        matchType: {type: String, required: true, enum: ['Broad', 'Phrase', 'Exact']},
        usSearch: {type: Number, required: true}
    }],
    _creatorId: {type: Schema.ObjectId, ref: 'User'}
});

NicheSchema.plugin(baseModelPlugin);
var Niche = mongoose.model('Niche', NicheSchema);

module.exports = Niche;