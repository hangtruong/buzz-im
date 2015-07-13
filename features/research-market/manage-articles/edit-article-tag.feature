@article-ui
Feature: Edit Article Tag
  In order to provide better content & increase conversion rate
  As a Marketer, I want to edit article manually

  Background:
    Given I have a niche "" with article "xxx"
    And I was in "articles/xxx/edit" edit page
    And I have the tags data as "tags.json"

  Scenario: Loading Tags
    When I search for tags "a"
    # TODO Write Scenario like this to minimize testing time, try to parameterize
    Then I should see the following tags
      | tag |
      | a1  |
      | a2  |
    # Make sure to clear old tag first
    When I search for tags "b"
    Then I should see the following tags
      | tag |
      | b1  |
      | b2  |
    When I search for tags "c"
    Then I should see the following tags
      | tag |
      | c1  |
      | c2  |

  Scenario: Add a new Tag
    When I search for tag "a"
    # which not in tags
    Then I should see the option in creating that tag
    When I choose to create that tag
    Then I should see that tag added to database
    And I should see the article contain that tag

  Scenario: Update Successfully when article is valid

  Scenario: Cannot Update when article is not valid
