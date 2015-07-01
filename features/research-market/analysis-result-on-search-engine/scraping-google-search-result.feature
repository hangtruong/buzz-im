@google-search-result
Feature: Scraping Google Search Result
  In order to measure the effectiveness of my SEO strategy and find a competitor niche
  As a Marketing Manager, I want to scraping & store the Google Search Result

  Scenario: Scraping Google Search Result Successfully
    Given I have the ScrapingTask with Niche is "Herpes Treatment" containing the following keywords:
      | herpes treatment        |
      | herpes cure             |
      | natural herpes remedies |
    And the result I want to get for each keywords is 50
    When I run that Task
    Then I will receive 150 valid html page on server
    And I should see that Task Status is "Complete"

  Scenario: Scraping Google Search Result Fail
    # Analyis the Fail reason later, maybe due to:
    # * Cannot read the Google's Page (Ip banned by Google)
    # * Cannot save to server
    Given I have the ScrapingTask with Niche is "Herpes Treatment" containing the following keywords:
      | herpes treatment        |
      | herpes cure             |
      | natural herpes remedies |
    And the result I want to get for each keywords is 50
    When I run that Task
    And  I should see that Task Status is "Fail"

  Scenario: Changed Ip when blocked by Google
    # Cannot read the Google's Page (Ip banned by Google)
    Given I have the ScrapingTask with Niche is "Herpes Treatment" containing the following keywords:
      | herpes treatment        |
      | herpes cure             |
      | natural herpes remedies |
    And the result I want to get for each keywords is 50
    When I run that Task
    And  Google has block my Ip "192.168.1.1" after running these 2 keywords
    Then The Ip should change
    And The Task will start again
    And I will receive 150 valid html page on server
    And I should see that Task Status is "Complete"