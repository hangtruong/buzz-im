@wip @authentication @login
Feature: Login
  In order to secure the system
  As a User, I want to login to the system

  @web-ui
  Scenario Outline: Login Successfully
    Given I have the credential <username>/<password> which is valid
    Examples:
      | username | password |
      | abc      | xyz      |
      | xyz      | abc      |
      | cba      | 111      |
    When I perform login
    Then I should see the dashboard page

  @web-ui
  Scenario Outline: Login Fail
    Given I have the credential <username>/<password> which is invalid
    When I perform login
    Then I should be in the login page
    And I should see the notification message
    Examples:
      | username | password |
      | abc      | xyz1     |
      | xyz      | abc2     |
      | cba      | 1113     |