@niche @wip
Feature: Add a new Niche
  In order to expand the market
  As a Marketer, I want to add a new Niche

  @web-ui
  Scenario Outline:  Add a new Niche
    Given I logged in to the system
    And I was on the "niche-list" page
    When I add the new niche with name is <name> and description is <description>
    Then I should see that niche in the list

    Examples:
      | name        | description           |
      | Cellulite   | Cellulite Treatment   |
      | Weight Loss | Weight Loss Treatment |