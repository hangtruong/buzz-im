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

    this.When(/^I add the new niche with code is (.*), name is (.*) and description is (.*)$/, function (code, name, description, callback) {
        newNiche = {
            code: code,
            name: name,
            description: description
        };

        // TODO Make test fail when cannot find elements by css
        element(by.css('.add-new')).click();
        element(by.model('code')).sendKeys(code);
        element(by.model('name')).sendKeys(name);
        element(by.model('description')).sendKeys(description);
        element(by.css('.add')).click();
        callback();
    });

    this.Then(/^I should see that niche in top of list$/, function (callback) {
        var firstItemPromise = element.all(by.repeater('niche in niches').column('niche.name')).first().getText();
        expect(firstItemPromise).to.be.eventually.equal(newNiche.name).and.notify(callback);
    });

    this.Then(/^I should see message tell that the new niche is invalid$/, function (callback) {
        expect(element(by.css('.new-niche-message')).getText()).to.be.eventually.equal('Niche is invalid').and.notify(callback);
    });

    this.When(/^I update a niche with code is (.*), name is (.*) and description is (.*)$/, function (code, name, description, callback) {
        newNiche = {
            code: code,
            name: name,
            description: description
        };

        element(by.css('.update888')).click();
        element(by.model('code')).sendKeys(code);
        element(by.model('name')).sendKeys(name);
        element(by.model('description')).sendKeys(description);
        element(by.css('.update-submit')).click();
        element(by.css('.update888')).getText().then(function(data){
            console.log(data);
        })

        callback();
    });

    this.Then(/^I should see that niche changed$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback();
    });

    this.Then(/^I should see message tell that the update niche is invalid$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback();
    });
};