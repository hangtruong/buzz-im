/**
 * Created by joehua on 6/27/15.
 */

'use strict';

// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
require("harmonize")();

var config = require('./config/config');
var app = require('./config/koa');

app.listen(config.port);