@article-ui
Feature: Manipulate Article List
  In order to organize article more effectively
  As a Marketer, I want to manipulate a article list

  Background:
    Given I logged in
    And I had a niche in "niche-fat-loss.json"
    And I was in "niches/fat-loss" page

  Scenario Outline: Search articles by keyword
    When I search for text <keyword>
    Then I will receive the following <articles>
    Examples:
      | keyword          | articles                           |
      | herpes treatment | Herpes Article 1, Herpes Article 2 |
      | herpes cure      | Herpes Article 3                   |
      | herpes remedies  |                                    |

  Scenario Outline: Search articles by tags
  # Search by AND Condition
    When I search for tags <tags>
    Then I will receive the following <articles> list
    Examples:
      | tags              | articles                           |
      | food              | Herpes Article 1, Herpes Article 2 |
      | natural treatment | Herpes Article 3                   |
      | exercise, food    | Herpes Article 1                   |

  Scenario: Show articles without tags
    When I choose show articles without tags
    Then I will receive the following <articles>
      | articles         |
      | Herpes Article   |
      | Herpes Article 3 |
      | Herpes Article 1 |

  Scenario: Show articles without Spintax
    When I choose show articles without Spintax
    Then I will receive the following <articles>
      | articles         |
      | Herpes Article   |
      | Herpes Article 3 |

  Scenario: Should reload the list when changing sort
    When I change sort direction to "desc"
    Then I will see that the list is reloaded

#  Scenario: Show 1 article editing when select 1 article
#  Scenario: Show multiple articles process option when select multiple articles

  Scenario: Change article edit panel when select 1 or multiple articles
    When I select article "article-a"
    Then I will see the showed panel is "article-a" edit
    # Change select 1 to multiple
    When I select articles with slug
      | slug      |
      | article-a |
      | article-b |
      | article-c |
      | article-d |
    Then I will see the showed panel is bulk operation for above articles
    # Change select multiple to 1
    When I select article "article-b"
    Then I will see the showed panel is "article-b" edit

  Scenario: Go To Article Details Page
    When I click (touch) at article  "article-a" Details Link
    Then I should go to "article-a" detail page

  Scenario: Batch Process Articles
# Get Article Spintax, Generate Tag
    When I select article with slug
      | slug      |
      | article-a |
      | article-b |
      | article-c |
      | article-d |
    And I choose Generate Tags
    Then I should be notified that the Process is completed
    And I should see tags was generated in these articles