@niche-api
Feature: Interact with Niche Api
  In order to provide more helpful data to End User
  As a Controller, I want to interact with Niche Api

  Background:
    Given I had a list of niches like "niches-init.json"

  Scenario Outline: Get niches
    When I request api with page = <page>, itemsPerPage = <itemsPerPage>, sortDimension = <sortDimension>, sortColumn = <sortColumn>, searchText = <searchText>
    Then I should see the niches as file <result>
    Examples:
      | page | itemsPerPage | sortDimension | sortColumn   | searchText | result                   |
      | 1    | 10           | asc           | createdTime  |            | niche-result-case-1.json |
      | 1    | 10           | desc          | name         |            | niche-result-case-2.json |
      | 1    | 10           | desc          | modifiedTime |            | niche-result-case-3.json |
      | 2    | 10           | asc           | name         |            | niche-result-case-4.json |
      | 1    | 10           | asc           | name         | dating     | niche-result-case-5.json |
      | 1    | 10           | asc           | name         | vertical   | niche-result-case-6.json |

  Scenario Outline: Get single niche by slug - GET /niches/niche_slug
    When I request api GET /niches/niche_slug with niche_slug = <niche_slug>
    Then I should be see single niche response
    And I should be see status code like status_code = <status_code>
    Examples:
      |niche_slug| status_code |
      |abcxyz    |  200        |

  Scenario Outline: Create new niche - POST /niches
    When I request api POST /niches with data json
    Then I should be see new niche created
    And I should be see status code is 200 or 201

  Scenario Outline: Update a niche - PUT /niches/niche_slug
    When I request api PUT /niches/niche_slug with data json
    Then I should be see niche updated
    And I should be see status code is 200

  Scenario Outline: Delete a niche - DELETE /niches/niche_slug
    When I request api DELETE /niches/niche_slug with niche_slug = <niche_slug>
    Then I should be see niche deleted
    And I should be see status code is status_code = <status_code>
    Examples:
      |niche_slug| status_code |
      |abcxyz    |  200        |






