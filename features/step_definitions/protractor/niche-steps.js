/**
 * Created by joehua on 7/1/15.
 */

var _ = require('underscore');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function () {

    var NicheListPage = require('./pages/niche-list-page');
    var nicheListPage = new NicheListPage();

    this.Given(/^I logged in$/, function (callback) {
        callback();
    });

    this.Given(/^I went to niche\-list page$/, function (callback) {
        browser.get('http://localhost:8000/client/#/niches');
        callback();
    });

    this.Then(/^I should see a list of niches$/, function (table, callback) {
        var data = _.map(table.hashes(), function (item) {
            return item.name;
        });

        var items = element.all(by.repeater('niche in niches').column('niche.name')).map(function (ele, index) {
            return ele.getText();
        });
        items.then(function (item) {
            console.log('items: ' + item);
            console.log('data: ' + data);
        })
        expect(items).to.be.eventually.deep.equal(data).and.notify(callback);
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
        nicheListPage.typeSearchText(searchText);
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
        return expect(element(by.css('.scroll-down')).getText())
            .to.be.eventually.equal('There\'s no more items').and.notify(callback);
    });

    this.When(/^I add the new niche with code is (.*), name is (.*) and description is (.*)$/, function (code, name, description, callback) {
        newNiche = {
            code: code,
            name: name,
            description: description
        };
        nicheListPage.addNewItem(newNiche);
        callback();
    });

    this.Then(/^I should see that niche in top of list$/, function (callback) {
        var firstItemPromise = element.all(by.repeater('niche in niches').column('niche.name')).first().getText();
        expect(firstItemPromise).to.be.eventually.equal(newNiche.name).and.notify(callback);
    });

    this.Then(/^I should see message tell that the new niche is invalid$/, function (callback) {
        expect(element(by.css('.new-niche-message')).getText()).to.be.eventually.equal('Niche is invalid').and.notify(callback);
    });
};