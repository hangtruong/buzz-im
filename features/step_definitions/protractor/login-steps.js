/**
 * Created by joehua on 6/27/15.
 */

module.exports = function () {
    this.Given(/^I have the credential "([^"]*)"\/"([^"]*)" which is valid$/, function (username, password, callback) {
        // Write code here that turns the phrase above into concrete actions
        browser.get('https://www.angularjs.org');
        this.username = username;
        this.password = password;
        callback();
    });

    this.Given(/^I have the credential "([^"]*)"\/"([^"]*)" which is invalid$/, function (username, password, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback();
    });


    this.When(/^I perform login$/, function (callback) {
        // browser.get('https://www.angularjs.org');
        // browser.wait();
        browser.wait();

    });

    this.Then(/^I should see the dashboard page$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback();
    });

    this.Given(/^I logged in to the system$/, function (callback) {
        // TODO Call the steps above to perform login
        callback();
    });

    this.Then(/^I should be in the login page$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^I should see the notification message$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

}