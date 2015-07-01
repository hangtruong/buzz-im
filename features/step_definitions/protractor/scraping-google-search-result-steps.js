/**
 * Created by joehua on 6/25/15.
 */
module.exports = function () {
    var task;
    var isBlockByGoogle = false;
    var taskRunner;

    this.Given(/^I have the ScrapingTask with Niche is "([^"]*)" containing the following keywords:$/, function (nicheName, table, callback) {
        // Write code here that turns the phrase above into concrete actions
        task.niche = createNiche(nicheName, table);
        callback.pending();
    });

    this.Given(/^the result I want to get for each keywords is (\d+)$/, function (results, callback) {
        // Write code here that turns the phrase above into concrete actions
        task.results = results;
        callback.pending();
    });

    this.When(/^I run that Task$/, function (callback) {
        taskRunner = taskRunnerFactory.create(task);
        taskRunner.run(); // taskRunner will start here.
        callback.pending();
    });

    this.Then(/^I will receive (\d+) valid html page on server$/, function (htmlPageCount, callback) {
        // Write code here that turns the phrase above into concrete actions
        taskRunner.waitTillComplete();
        var htmlPages = taskRunner.Outputs['pages'];
        assert.equal(htmlPageCount, htmlPages);
        callback.pending();
    });

    this.Then(/^I should see that Task Status is "([^"]*)"$/, function (status, callback) {
        // Write code here that turns the phrase above into concrete actions
        assert.equal(status, task.Status);
        callback.pending();
    });
    this.When(/^Google has block my Ip "([^"]*)" after running these (\d+) keywords$/, function (currentIpAddress, numOfKeywords, callback) {
        // TODO Fake Reset Ip Events (Fake event that will fire after running a specific page)
        // TODO In technically, this step is run before the previous step completed.

        this.currentIpAddress = currentIpAddress;
        taskRunner.ItemsDone.subscribe(function (itemCount) {
            if (itemCount >= numOfKeywords)
                isBlockByGoogle = true;
        });
        callback.pending();
    });

    this.Then(/^The Ip should change$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        var newIpAddress = networkHelper.getCurrentIp();
        assert.notEqual(newIpAddress, this.currentIpAddress);
        callback.pending();
    });


    this.Then(/^The Task will start again$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        assert.equal(true, isBlockByGoogle);
        callback.pending();
    });

}