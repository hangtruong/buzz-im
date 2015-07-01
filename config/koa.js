/**
 * Created by joehua on 6/28/15.
 */

"use strict"
var koa = require('koa');
var app = koa();

// trust proxy
app.proxy = true;


// body parser
var bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// public routes
var Router = require('koa-router');
var publicRoute = new Router();

publicRoute.get('/', function *(next) {
    this.body = 'Hello World!';
});

// setup Mongoose
var config = require('./config');
var mongoose = require('../config/mongoose')();
var Niche = mongoose.model('Niche');

publicRoute.post('/niches', function *(next) {
    var entity = new Niche(this.request.body);

    try {
        yield entity.save();
        this.body = entity;
    } catch (e) {
        this.throw(500, e);
    }
});

publicRoute.get('/niches', function *(next) {
    try {
        var entities = yield Niche.find({}).exec();
        this.body = entities;
    } catch (e) {
        this.throw(500, e);
    }
});

app.use(publicRoute.middleware());

module.exports = app;