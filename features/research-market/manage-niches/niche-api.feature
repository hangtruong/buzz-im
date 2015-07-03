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






