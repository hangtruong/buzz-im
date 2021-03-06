@article-api
Feature: Generate Post from Article
  In order to produce content faster
  As a Marketer, I want to generate a Post from an Article

  Scenario:
    Given I have a niche "aaa" with article "xxx"
    # xxx has Spintax
    And I was in "articles/xxx" view page
    When I generate this article with quality 1
    Then I will receive the Post with quality 1
    # TODO Check a Post with quality 1? May be check if it's generated by Spintax with quality 1