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
    this.When(/^I change the Sort Column by "([^"]*)"$/, function (createdTime, callback) {
        element(by.css('select option[value="' + createdTime + '"]')).click();
        callback();
    });

    this.When(/^I change the Sort Direction to DESC$/, function (callback) {
        element(by.css('select option[value="desc"]')).click();
        callback();
    });

    this.When(/^I enter the text "([^"]*)"$/, function (searchText, callback) {
        element(by.model('searchText')).sendKeys(searchText);
        callback();
    });

    this.Then(/^I should see a message tell me there's no niches$/, function (callback) {
        expect(element(by.css('.is-empty')).getText())
            .to.be.eventually.equal('There\'s no niches').and.notify(callback);
    });

    this.When(/^I scroll down to bottom$/, function (callback) {
        element(by.css('.scroll-down')).click();
        callback();
    });

    this.Then(/^I should see a message tell me there's no more niches to load$/, function (callback) {
        expect(element(by.css('.scroll-down')).getText())
            .to.be.eventually.equal('There\'s no more items').and.notify(callback);
    });


};