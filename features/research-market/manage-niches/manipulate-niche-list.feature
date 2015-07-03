@niche-ui @niche
Feature: Manipulate Niche List
  In order to organize niche more effectively
  As a Marketer, I want to manipulate a niche list

  Background:
    Given I logged in
    And I had a list of niches like "niches-init.json"

    And I went to niche-list page
  # We assume that by default, the sort direction is Asc by Name load 10 items / time

  Scenario: Load niches
    Then I should see a list of niches
      | name             |
      | Anxiety          |
      | Aquaponics       |
      | Build Muscle     |
      | Dating for Man   |
      | Dating for Woman |
      | Dog Food         |
      | Dog Training     |
      | Fat Loss         |
      | Heart Burn       |
      | Hemorrhoids      |


  # TODO Make a decision whether test the following in Angular Controller or in Web UI
  Scenario: Refresh the list when change Sort Column
    When I change the Sort Column by "createdTime"
    # TODO How to check if a DOM elements is reloaded
    Then I should see a list of niches
      | name             |
      | Weight Loss      |
      | Build Muscle     |
      | Herpes           |
      | Fat Loss         |
      | Hemorrhoids      |
      | Dog Food         |
      | Dog Training     |
      | Vertical Jump    |
      | Dating for Man   |
      | Dating for Woman |

  Scenario: Refresh the list when change Sort Direction
    When I change the Sort Direction to DESC
    Then I should see a list of niches
      | name             |
      | Weight Loss      |
      | Vertical Jump    |
      | Psoriasis        |
      | Herpes           |
      | Hemorrhoids      |
      | Heart Burn       |
      | Fat Loss         |
      | Dog Training     |
      | Dog Food         |
      | Dating for Woman |

  Scenario: Refresh the list when searching
    When I enter the text "dating"
    Then I should see a list of niches
      | name             |
      | Dating for Man   |
      | Dating for Woman |

  Scenario: Search for text that return no niche
    When I enter the text "xxx"
    Then I should see a message tell me there's no niches

  Scenario: Should load more niches when scrolling to bottom
    When I scroll down to bottom
    Then I should see a list of niches
      | name             |
      | Anxiety          |
      | Aquaponics       |
      | Build Muscle     |
      | Dating for Man   |
      | Dating for Woman |
      | Dog Food         |
      | Dog Training     |
      | Fat Loss         |
      | Heart Burn       |
      | Hemorrhoids      |
      | Herpes           |
      | Psoriasis        |
      | Vertical Jump    |
      | Weight Loss      |

  Scenario: Shouldn't load more niches when scrolling to bottom but have no more niche
    When I scroll down to bottom
    And I scroll down to bottom
    Then I should see a message tell me there's no more niches to load