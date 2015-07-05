@niche-ui
Feature: Update a Niche
  In order to expand the market
  As a Marketer, I want to update a Niche

  Background:
    Given I logged in
    And I had a list of niches like "niches-init.json"
    And I went to niche-list page

  Scenario Outline:  Update a Niche
    When I change niche with code = <old code> to code = <code>, name = <name> and description = <description>
    Then I should see that result is <result> and receive the message <message>
    Examples:
      | old code | code         | name             | description             | result  |
      | fat-loss | new-fat-loss | Updated Fat Loss | This is the new updated | success |
      | fat-loss |              | Update Niche     | This is the new updated | fail    |
      | fat-loss | new-fat-loss |                  | This is the new updated | fail    |

# Feature written by Advanced User
# In the UI Test, fail mean that I cannot update the Niche & receive a message but don't care about it.
# We'll cover it in API or Controller Tests.
  # Use Controller Tests to assert that the message is right when UI Validating
  # Use Api Tests for anything that belongs to server constraints (duplicate code, ...)

# Feature written by Beginning User (they need more information shown on the tests)
# We should write a test like below or divide to 2 scenario (like Create a new Niche)

#    Then I should see that result is <result> and receive the message <message>
#      | old code | code         | name             | description             | result  | message              |
#      | fat-loss | new-fat-loss | Updated Fat Loss | This is the new updated | success |                      |
#      | fat-loss |              | Update Niche     | This is the new updated | fail    | Code cannot be empty |
#      | fat-loss | new-fat-loss |                  | This is the new updated | fail    | Name cannot be empty |