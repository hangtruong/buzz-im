/**
 * Created by joehua on 6/28/15.
 */

"use strict"
var koa = require('koa');
var app = koa();

// trust proxy
app.proxy = true;


var cors = require('koa-cors');
app.use(cors());

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

publicRoute.post('/niches/bulk', function *(next) {
    var self = this;
    console.log(this.request.body);
    try {
        // TODO Refactor to use collection with generator
        for (var i = 0; i < this.request.body.length; i++) {
            var entity = new Niche(this.request.body[i]);
            yield entity.save();
        }
        this.body = "Success";
    } catch (e) {
        this.throw(500, e);
    }
});

publicRoute.delete('/niches/clear', function *(next) {
    try {
        // TODO Refactor to use Generator
        yield Niche.remove({});
        this.body = 'Remove Successfully';

    } catch (e) {
        this.throw(500, e);
    }
});

publicRoute.get('/niches', function *(next) {
    try {
        console.log(this.request.url);
        console.log(this.params);
        console.log(this.request.query);

        var page = parseInt(this.request.query.page);
        var itemsPerPage = parseInt(this.request.query.itemsPerPage);
        var sortColumn = this.request.query.sortColumn;
        var sortDimension = this.request.query.sortDimension == 'desc' ? -1 : 1;

        var skip = (page - 1) * itemsPerPage;

        var sort = {};
        sort[sortColumn] = sortDimension;

        var entities = yield Niche.find({}).skip(skip).limit(itemsPerPage).sort(sort).exec();
        this.body = entities;
    } catch (e) {
        this.throw(500, e);
    }
});

app.use(publicRoute.middleware());

module.exports = app;