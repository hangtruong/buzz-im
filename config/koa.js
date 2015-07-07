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

// logger
var logger = require('koa-logger');
app.use(logger());

// setup Mongoose
var config = require('./config');
var mongoose = require('../config/mongoose')();
var Niche = mongoose.model('Niche');

// public routes
var Router = require('koa-router');
var publicRoute = new Router();

publicRoute.get('/', function *(next) {
    this.body = 'Hello World!';
});

publicRoute.post('/niches', function *(next) {
    var entity = new Niche(this.request.body);
    try {
        yield entity.save();
        var res = {
            message: "Success",
            data:entity
        }
        this.body = res;
    } catch (e) {
        this.status = 301;
        this.body = 'Invalid niche';
    }
});

publicRoute.post('/niches/bulk', function *(next) {

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
        var page = parseInt(this.request.query.page) || 1;
        var itemsPerPage = parseInt(this.request.query.itemsPerPage) || 10;
        var sortColumn = this.request.query.sortColumn || 'name';
        var sortDimension = this.request.query.sortDimension == 'desc' ? -1 : 1 || 'asc';
        var skip = (page - 1) * itemsPerPage;
        var searchText = this.request.query.searchText || '';
        var entities;
        var sort = {};
        sort[sortColumn] = sortDimension;
        if (searchText != '') {
            var entities = yield Niche
                .find({$text: {$search: searchText}})
                .skip(skip).limit(itemsPerPage).sort(sort);
            this.body = entities;
        } else {
            entities = yield Niche.find({}).skip(skip).limit(itemsPerPage).sort(sort).exec();
            this.body = entities;
        }
    } catch (e) {
        this.throw(500, e);
    }
});

// GET /niches/:nicheSlug
publicRoute.get('/niches/:nicheSlug', function *(next) {
    //TODO research error handler middleware in koa
    try {
        var nicheSlug = this.params.nicheSlug;
        var niche = yield Niche.findOne({code: nicheSlug}).exec();
        if (niche == null) {
            this.status = 404;
            var res = {
                message: 'Not found',
                data: niche
            };
            this.body = res;
        } else {
            this.status = 200;
            var res = {
                message: 'Success',
                data: niche
            };
            this.body = res;
        }
    } catch (e) {
        this.throw(500, e);
    }
});

// PUT /niches/:nicheSlug
publicRoute.put('/niches/:nicheSlug', function *(next) {
    try {
        var nicheSlug = this.params.nicheSlug;
        var niche = yield Niche.findOne({code: nicheSlug}).exec();
        if (niche == null) {
            this.status = 404;
            var res = {
                message: 'Not found'
            };
            this.body = res;
        }
        var resJson = this.request.body
        niche.name = resJson.name;
        niche.description = resJson.description;
        niche.keywords = resJson.keywords;
        niche.code = resJson.code;
        niche.modifiedTime = new Date();
        yield niche.save();
        var res = {
            message: 'Success',
            data: niche
        };
        this.body = res;
    } catch (e) {
        this.throw(500, e);
    }
});

// DELETE /niches/:nicheSlug
publicRoute.delete('/niches/:nicheSlug', function *(next) {
    try {
        var nicheSlug = this.params.nicheSlug;
        yield Niche.remove({code: nicheSlug}).exec();
        this.body = {message: 'Success'};
    } catch (e) {
        this.throw(500, e);
    }
});

app.use(publicRoute.middleware());

module.exports = app;