// Page Objects Patterns
function NicheListPage() {

    var search = element(by.model('searchText'));
    var newNiche = element(by.css('.modal-content'));

    var code = element(by.id('code'));
    var name = element(by.id('name'));
    var description = element(by.id('description'));

    var addNew = element(by.css('.add-new'));
    var submit = element(by.css('.submit'));

    this.typeSearchText = function (searchText) {
        search.sendKeys(searchText);
    };

    this.addNewItem = function (niche) {
        // Manually disable fade effect for timing
        //browser.executeScript("$('#myModal').removeClass('fade');");
        addNew.click();

        code.sendKeys(niche.code);
        name.sendKeys(niche.name);
        description.sendKeys(niche.description);
        submit.click();
    };
};

module.exports = NicheListPage;