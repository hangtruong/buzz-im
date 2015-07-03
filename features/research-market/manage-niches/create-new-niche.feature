@niche-ui @wip
Feature: Add a new Niche
  In order to expand the market
  As a Marketer, I want to add a new Niche

  Background:
    Given I logged in
    And I had a list of niches like "niches-init.json"
    And I went to niche-list page

  Scenario Outline:  Add a new Niche
    When I add the new niche with code is <code>, name is <name> and description is <description>
    Then I should see that niche in top of list

    Examples:
      | code      | name      | description           |
      | new-niche | New Niche | This is the new niche |

  Scenario Outline: Notify when add an invalid Niche
    When I add the new niche with code is <code>, name is <name> and description is <description>
    Then I should see message tell that the new niche is invalid
    Examples:
      | code      | name      | description |
      |           | New Niche |             |
      | new-niche |           |             |