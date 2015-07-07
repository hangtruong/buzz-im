@article-api
Feature: Tag Article automatically
  In order to produce content faster
  As a Marketer, I want to tag article automatically

  Scenario: Tag Article successfully
    Given I have an article
  """

  """
    And the following keywords
      | Keyword             | Priority |
      | cellulite treatment | 1        |
      | cellulite removal   | 2        |
      | cellulite           | 3        |
    When I perform tag article automatically
    Then I will see that Article have the following Tags
      | cellulite treatment |
      | cellulite removal   |