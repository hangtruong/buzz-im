/**
 * Created by joehua on 6/27/15.
 */

module.exports = function () {
    this.Given(/^I was on the "([^"]*)" page$/, function (page, callback) {
        // TODO Config Protractor to use default Url
        //browser.get(page);
        browser.get('https://www.angularjs.org');
        callback();
    });
}