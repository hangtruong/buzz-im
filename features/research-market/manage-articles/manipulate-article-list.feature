Feature: Manipulate Article List
  In order to organize article more effectively
  As a Marketer, I want to manipulate a article list

  Background:
    Given I logged in to the system
    And I was on the "article-list" page of niche "Herpes"
    And I have the following Articles on folder "herpes-articles"

  Scenario Outline: Search articles by keyword
    When I search for text <keyword>
    Then I will receive the following <articles>
    Examples:
      | keyword          | articles                           |
      | herpes treatment | Herpes Article 1, Herpes Article 2 |
      | herpes cure      | Herpes Article 3                   |
      | herpes remedies  |                                    |

    # TODO Not use this scenario because we don't use a table
  Scenario Outline: Sort articles
    Given The search column is <before column> and sort dimension is <before dimension>
    When I sort by column <sort column>
    Then articles is sorted by <after column> with dimension <after dimension>
    Examples:
      | before column | before dimension | sort column  | after column | after dimension |
      | title         | default          | title        | title        | asc             |
      | title         | asc              | title        | title        | desc            |
      | title         | desc             | title        | title        | default         |
      | title         | default          | created time | created time | asc             |