Feature: Manipulate Niche List
  In order to organize niche more effectively
  As a Marketer, I want to manipulate a niche list

  Scenario Outline: Untitled
    Given I logged in to the system
    And I was on the "niche-list" page
    And I define the View as following sort = <Sort>, Sort Dimension = <Sort Dimension>, Text = <Full Text Search>
    Then I should see the list as the file <Result>
    Examples:
      | Sort | Sort Dimension | Full Text Search | Result      |
      | Name | Asc            |                  | result1.txt |
      | Name | Asc            | cellulite        | result2.txt |
      | Name | Desc           | weight loss      | result3.txt |


  # TODO Make a decision whether test the following in Angular Controller or in Web UI
  Scenario: Refresh the list when change Sort Column

  Scenario: Refresh the list when change Sort Direction

  Scenario: Refresh the list when enter new Search Text

  Scenario: Should load more items when scrolling to bottom

  Scenario: Shouldn't load more items when scrolling to bottom but have no more niche

