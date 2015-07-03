@niche-ui @wip
Feature: Update a Niche
  In order to expand the market
  As a Marketer, I want to update a Niche

  Background:
    Given I logged in
    And I had a list of niches like "niches-init.json"
    And I went to niche-list page

  Scenario Outline:  Update a Niche
    When I update a niche with code is <code>, name is <name> and description is <description>
    Then I should see that niche changed

    Examples:
      | code         | name         | description               |
      | update-niche | Update Niche | This is the niche updated |

  Scenario Outline: Notify when update niche invalid
    When I update a niche with code is <code>, name is <name> and description is <description>
    Then I should see message tell that the update niche is invalid
    Examples:
      | code      | name      | description |
      |           | New Niche |             |
      | new-niche |           |             |