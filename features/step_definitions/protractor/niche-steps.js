/**
 * Created by joehua on 6/23/15.
 */
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

module.exports = function () {
    this.When(/^I add the new niche with name is (.*) and description is (.*)$/, function (name, description, callback) {
        // Write code here that turns the phrase above into concrete actions
        element(by.model('todoList.todoText')).sendKeys('cellulite');
        element(by.css('[value="add"]')).click();
        callback();
    });

    this.Then(/^I should see that niche in the list$/, function (callback) {
        expect(element.all(by.repeater('todo in todoList.todos')).count())
            .to.be.eventually.equal(3).and.notify(callback);
        // TODO Add this to issue - Find out when call callback() at the final step, Protractor cannot run
    });
}