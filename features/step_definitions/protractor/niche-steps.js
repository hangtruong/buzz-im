/**
 * Created by joehua on 7/1/15.
 */

var _ = require('underscore');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function () {
    this.Given(/^I logged in$/, function (callback) {
        callback();
    });

    this.Given(/^I had a list of niches$/, function (jsonData, callback) {
        //jsonData = JSON.parse(jsonData);
        //jsonData = _.sortBy(jsonData, function(o) { return o.name; });
        //jsonData = jsonData.reverse();
        //_.map(jsonData, function (data) {
        //    console.log("|" + data.name + "|");
        //});
        // TODO Insert data
        var request = require('request');
        request({
                method: 'POST',
                url: 'http://localhost:3000/niches/bulk',
                json: JSON.parse(jsonData)
            }, function (err, response, body) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('Success');
                callback();
            }
        );
    });

    this.Given(/^I went to niche\-list page$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        browser.get('http://localhost:8000/client/#/niches');
        callback();
    });

    this.Then(/^I should see a list of niches$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        var data = _.map(table.hashes(), function (item) {
            return item.name;
        });

        // TODO Compare item by item
        //var ele = element(by.repeater('niche in niches').row(0).column('niche.code'));

        var items = element.all(by.repeater('niche in niches').column('niche.name')).map(function (ele, index) {
            return ele.getText();
        });
        items.then(function (item) {
            console.log('items: ' + item);
            console.log('data: ' + data);
        })
        expect(items).to.be.eventually.deep.equal(data).and.notify(callback);

        //expect(ele.getText())
        //    .to.be.eventually.equal(data[0].code).and.notify(callback);
    });

    this.When(/^I change the Sort Column by created time$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        element(by.css('select option[value="created-time"]')).click();
        callback();
    });

    this.When(/^I change the Sort Direction to DESC$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        element(by.css('select option[value="desc"]')).click();
        callback();
    });

    this.When(/^I enter the text "([^"]*)"$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^I should see a message tell me there's no niches$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I scroll down to bottom$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^I should see new niches is added to the list$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^I should see a message tell me there's no more niches to load$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });




};