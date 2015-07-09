// Invoke 'strict' JavaScript mode
'use strict';

// Load the correct configuration file according to the 'NODE_ENV' variable

var env = process.env.NODE_ENV || 'development';
module.exports = require('./env/' + env + '.js');