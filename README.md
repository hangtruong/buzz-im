* Automate Test
    * Run Protractor E2E Test: protractor config/protractor-conf.js
    * Karma + Cucumber to testing AngularJs Controller
    * Run Cucumber Api Test: npm test
        * This has been config in package.json
    * Unit Test complicated algorithms
    
* Task
    * Login Features
    * Themes
    * Setting up AngularJs Project
    * Way to start the Application (Front-End & Back-End)
    * Place to share knowledge & experience when coding
    * Organize Step Definitions between WebUI, Api & Controller Tests
    
* Research:
    * Start a RESTful Server for Testing (E2E) - Use Grunt for start server all RESTful Tests & use Mognoose to setup the Db State.
    * Better Way to organize Mongoose Model & Controllers
    * ! Use Promise in Cucumber (sugar utility to convert step to Promise (see more at BDD with JS - Chapter 4) - or remove callback hell)
    * Write Step Definition using Promise Style
    * Setup & Clear MongoDb in @api before hook
    * Make better Cucumber report by inspect Chai assertion error to compose more meaningful message (see more at BDD with JS - Chapter 4)
    * Configure Jenkins to automate test
    * Maintain MongoDb Initialization
    * Use Page Objects to refactor the UI Test: http://martinfowler.com/bliki/PageObject.html
    
* Problem fixed:
    * In this time, don't care about cannot find element using locator in E2E Test, The root cause of this problem is race condition (callback will be call before click action is completed - Protractor Cucumber bugs). The test is actually run & will failed at the assert steps.