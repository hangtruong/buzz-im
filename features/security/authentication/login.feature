@wip @authentication @login
Feature: Login
  In order to secure the system
  As a User, I want to login to the system

  @web-ui
  Scenario: Login Successfully
    Given I have the credential "abc"/"xyz" which is valid
    When I perform login
    Then I should see the dashboard page

  @web-ui
  Scenario: Login Fail
    Given I have the credential "abc"/"xxx" which is invalid
    When I perform login
    Then I should be in the login page
    And I should see the notification message