Feature: Interact with Niche Api
  In order to provide more helpful data to End User
  As a Controller, I want to interact with Niche Api

  Background:
    Given I have a list of niches
    """
    [
      {"name": "Weight Loss", "code":"weight-loss"},
      {"name": "Fat Loss", "code":"fat-loss"},
      {"name": "Herpes", "code":"herpes"},
      {"name": "Cellulite", "code":"cellulite"}
    ]
    """

  @api
  Scenario: Add new niche
    When I add a new Niche
    """
    {"name":"Hemorrhoids", "code":"hemorrhoids"}
    """
    Then I should see the Niche with code = "hemorrhoids" is added

  Scenario Outline: Retrieve a list of niches
    When I set search text=<search text>, sort=<sort column>, sort dimension=<sort dimension>
    Then I will receive a result list like <result>
    Examples:
      | search text | sort column | sort dimension | result                                |
      | cellulite   | name        | asc            | cellulite                             |
      | loss        | code        | asc            | fat-loss,weight-loss                  |
      |             | name        | desc           | weight-loss,herpes,fat-loss,cellulite |
      | diabetes    | code        | asc            |                                       |

  Scenario: Load more items