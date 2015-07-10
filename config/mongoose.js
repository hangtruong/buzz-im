/**
 * Created by joehua on 6/28/15.
 */

'use strict';

// Load the module dependencies
var config = require('./config'),
    mongoose = require('mongoose');

// Define the Mongoose configuration method
module.exports = function () {
    // Load the application models
    if (!mongoose.connection.models['Niche', 'Article'])
        require('../server/models/content/niche.model.js')();
        require('../server/models/content/article.model.js')();
    // Use Mongoose to connect to MongoDB
    if (!mongoose.connection.readyState)
        mongoose.connect(config.db);
    return mongoose;
};