module.exports = function () {
    this.Given(/^I have Niche "([^"]*)" with keywords$/, function (nicheName, table, callback) {
        // TODO Move this step niche relation steps
        // console.log(table.hashes());
        this.niche = {Keywords: table.hashes(), name: nicheName};
        //var keywords = Keyword.parseTable(table);
        //var niche = Niche.create({name: nicheName, keywords: keywords});

        //this.World = {niche: niche};

        callback();
    });

    this.Given(/^Current Date is "([^"]*)"$/, function (dateString, callback) {
        // Write code here that turns the phrase above into concrete actions
        var date = new Date(dateString);
        this.currentDate = date;
        console.log(date);
        callback();
    });

    this.When(/^I import keywords from (.*)$/, function (keywordFile, callback) {
        // Write code here that turns the phrase above into concrete actions
        console.log("Start importing...");
        console.log(this.currentDate);
        console.log(this.niche);
        callback.pending();
    });

    this.Then(/^I should see the Niche containing keywords in (.*)$/, function (nicheAfterImportFile, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^Keywords Logs will contain all the imported keywords with Current Date$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I import keywords from invalid "([^"]*)"$/, function (invalidFileName, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^I should see that no keywords have been imported$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });
};