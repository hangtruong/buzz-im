@niche @wip
Feature: Manipulate Niche List
  In order to organize niche more effectively
  As a Marketer, I want to manipulate a niche list

  Background:
    Given I logged in
    And I had a list of niches
    """
  [
  {"code": "weight-loss", "name": "Weight Loss", "description": "All about weight loss"},
  {"code": "build-muscle", "name": "Build Muscle", "description": "All about build mass muscle fast"},
  {"code": "herpes", "name": "Herpes", "description": "Natural Herpes Treatment"}
  ]
    """

  Scenario: Load items
    When I go to niche-list page
    Then I should see a list of niches
      | code         |
      | weight-loss  |
      | build-muscle |
      | herpes       |

  # TODO Make a decision whether test the following in Angular Controller or in Web UI
  Scenario: Refresh the list when change Sort Column
    When I go to niche-list page
    And I choose Sort by Name Asc
    Then I should see a list of niches
      | code         |
      | build-muscle |
      | herpes       |
      | weight-loss  |

  Scenario: Refresh the list when change Sort Direction

  Scenario: Refresh the list when enter new Search Text

  Scenario: Should load more items when scrolling to bottom

  Scenario: Shouldn't load more items when scrolling to bottom but have no more niche

