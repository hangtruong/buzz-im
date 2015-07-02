@niche-ui @wip @niche
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
  {"code": "herpes", "name": "Herpes", "description": "Natural Herpes Treatment"},
  {"code": "fat-loss", "name": "Fat Loss", "description": "How to lose fat safely & naturally"},
  {"code": "hemorrhoids", "name": "Hemorrhoids", "description": "Hemorrhoids Treatment"},
  {"code": "psoriasis", "name": "Psoriasis", "description": "Psoriasis Treatment"},
  {"code": "aquaponics", "name": "Aquaponics", "description": "How to build a Aquaponics system"},
  {"code": "dog-food", "name": "Dog Food", "description": "Dog Food Secrets"},
  {"code": "dog-training", "name": "Dog Training", "description": "Dog Training Secrets"},
  {"code": "vertical-jump", "name": "Vertical Jump", "description": "Vertical Jump Training"},
  {"code": "dating-for-man", "name": "Dating for Man", "description": "Dating for Man Guide"},
  {"code": "dating-for-woman", "name": "Dating for Woman", "description": "Dating for Woman Guide"},
  {"code": "anxiety", "name": "Anxiety", "description": "Anxiety Treatment"},
  {"code": "heart-burn", "name": "Heart Burn", "description": "Heart Burn Treatment"}
  ]
    """
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
    When I change the Sort Column by created time
    # TODO How to check if a DOM elements is reloaded
    Then I should see a list of niches
      | name          |
      | Weight Loss   |
      | Build Muscle  |
      | Herpes        |
      | Fat Loss      |
      | Hemorrhoids   |
      | Psoriasis     |
      | Aquaponics    |
      | Dog Food      |
      | Dog Training  |
      | Vertical Jump |

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
    Then I should see a message tell me there's no more niches to load

