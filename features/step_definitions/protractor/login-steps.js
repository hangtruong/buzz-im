/**
 * Created by joehua on 6/27/15.
 */
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;
module.exports = function () {
    this.World = require('../support/world').World;

    this.Given(/^I have the credential "([^"]*)"\/"([^"]*)" which is valid$/, function (username, password, callback) {
        this.username = username;
        this.password = password;
        callback();
    });

    this.When(/^I perform login$/, function (callback) {
        browser.get('http://localhost:63342/buzz-im/client/index.html#/login');

        element(by.model('username')).sendKeys(this.username);
        element(by.model('password')).sendKeys(this.password);
        element(by.css('button')).click();
        callback();
    });

    this.Given(/^I have the credential "([^"]*)"\/"([^"]*)" which is invalid$/, function (username, password, callback) {
        this.username = username;
        this.password = password;
        callback();
    });

    this.Then(/^I should see the dashboard page$/, function (callback) {
        // TODO Replace with right function to check it's Dashboard Page
        expect(element(by.model('dashboard')).getAttribute('value'))
            .to.be.eventually.equal('1').and.notify(callback);
    });

    this.Then(/^I should be in the login page$/, function (callback) {
        expect(element(by.model('notification')).getText())
            .to.be.eventually.equal('').and.notify(callback);
    });

    this.Then(/^I should see the notification message$/, function (callback) {
        expect(element(by.model('notification')).getAttribute('value'))
            .to.be.eventually.equal('Error').and.notify(callback);
    });
}