/**
 * Created by joehua on 7/1/15.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function () {
    this.Given(/^I logged in$/, function (callback) {
        callback();
    });

    this.Given(/^I had a list of niches$/, function (jsonData, callback) {
        // TODO Insert data
        var request = require('request');
        console.log(jsonData);
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

    this.When(/^I go to niche\-list page$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        browser.get('http://localhost:8000/client/#/niches');
        callback();
    });

    this.Then(/^I should see a list of niches$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        var data = table.hashes();

        // TODO Compare item by item
        var ele = element(by.repeater('niche in niches').row(0).column('niche.code'));

        expect(ele.getText())
            .to.be.eventually.equal(data[0].code).and.notify(callback);
    });

    this.When(/^I choose Sort by Name Asc$/, function (callback) {
        element(by.css('select option[value="name"]')).click();
        // TODO Implement wait event

        callback();
    });
};