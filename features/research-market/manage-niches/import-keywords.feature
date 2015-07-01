@keyword @wip
Feature: Import Keywords
  In order to research niche more effectively
  As a Marketer, I want to import keywords from csv to niche

  Background:
    Given I have Niche "Weight Loss" with keywords
      | Text                  | Search |
      | weight loss           | 2000   |
      | lose weight           | 3000   |
      | lose weight naturally | 1200   |
      | lose weight fast      | 1300   |
    And Current Date is "2015-02-10"

  Scenario Outline: Import Keywords successfully
    When I import keywords from <keyword file>
    Then I should see the Niche containing keywords in <niche after import file>
    And Keywords Logs will contain all the imported keywords with Current Date
    Examples:
      | keyword file | niche after import file |
      | keyword1.csv | niche1.csv              |
      | keyword2.csv | niche2.csv              |
      | keyword3.csv | niche3.csv              |

  Scenario: Fail to import Keywords due to incorrect csv file
    When I import keywords from invalid "invalid-format-keywords.csv"
    Then I should see that no keywords have been imported
    # TODO Prepare Keywords example files
    # TODO Some Test will use Protractor, Some Test must be tested as Functional