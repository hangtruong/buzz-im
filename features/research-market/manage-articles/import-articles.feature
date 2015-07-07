@article-ui
Feature: Import Articles
  In order to enrich & provide better content
  As a Marketer, I want to import articles from zip file

  Background:
    Given I logged in
    And I had a niche in "niche-fat-loss.json"
    And I was in "niches/fat-loss" page

  Scenario: Import Article Successfully
    When I import articles from file "valid-articles.zip"
    Then I should see that import is success
    And I should see the imported articles

  Scenario: Import Article Fail
    When I import articles from file "invalid-articles.zip"
    Then I should see that import is fail
    And I should not see any imported article