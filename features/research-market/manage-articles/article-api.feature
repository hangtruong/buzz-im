@articles-api
#features/research-market/article-api.feature
Feature: Manage articles API
  As a developer
  I want to request articles APIs
  So that I receive needed data to develop manage articles feature in app client

  #Case GET /niches/niche_slug/articles
  Scenario Outline: Case #01 - Find all articles belong to niche by niche slug
    #Given background
    Given I had list articles like <articles_file> and niche_slug like <niche_slug> and request authenticated success
    When I make a request GET /niches/niche_slug/articles to server
    Then I should see in response header Content-Type is <content_type>, HTTP status code is <http_status_code>
    And I should see response list articles like file <expect_file>
    Examples:
      | articles_file      | niche_slug | content_type                    | http_status_code | expect_file   |
      | articles-init.json | blabla     | application/json; charset=utf-8 | 200              | articles.json |

#  #Case GET /niches/niche_slug/article?page=:page&per_page=:per_page&order_by=:order_by&sort_column=:sort_column
#  Scenario Outline: Case #02 -Find articles belong to niche by niche_slug with padding, sort, order
#    Given I had list articles like <articles_file> and niche_slug like <niche_slug> and request authenticated success
#    When I make request GET /niches/niche_slug/article with params like page = <page>, item per page = <per_page>, order by = <order_by>, sort column = <sort_column>
#    Then I should see list articles like file <expect_file>
#    Examples:
#      | articles_file      | niche_slug    | page | per_page | order_by | sort_column | expect_file      |
#      | articles_init.json | niche_slug_01 | 1    | 10       | asc      | title       | articles_01.json |
#      | articles_init.json | niche_slug_02 | 10   |          | desc     | title       | articles_02.json |
#
#  #Case GET /niches/niche_slug/article?page=:page&per_page=:per_page&order_by=:order_by&sort_column=:sort_column&spintax=:spintax_flag&tag=:tag_flag&searchText=:searchText&tag=:tag
#
#  #Case POST /niches/niche_slug/articles/upload
#  Scenario Outline: Case #06 - Import file articles.zip has many file article_title.txt. Each article_tile.txt formatted markdown style
#    Given I had file like <import_articles_file> and request authenticated success
#    When I make request POST /niches/niche_slug/articles/upload
#    Then I should be see result process import like <result>
#    Examples:
#      | import_articles_file   | result |
#      | import_articles_01.zip | true   |
#      | import_articles_02.zip | false  |
#
#  #Case POST /niches/niche_slug/keywords/upload
#  Scenario Outline: Case #07 - Import file keywords.csv
#    Given I had file like <import_keywords_file> and request authenticated success
#    When I make request POST /niches/niche_slug/keywords/upload
#    Then I should be see result process import like <result>
#    Examples:
#      | import_keywords_file   | result |
#      | import_keywords_01.csv | true   |
#      | import_keywords_02.csv | false  |
#
#  #Case PUT /articles/:article_slug
#  Scenario Outline: Case #08 - Update article by article slug
#    Given I had article data like <update_article_file> in database and request authenticated success
#    When I make request PUT /articles/:article_slug
#    Then I should see response body like <result>
#    Examples:
#      | update_article_file    | result |
#      | update_article_01.json | true   |
#      | update_article_02.json | false  |
#
#
#  #Case PATCH /articles/bulk
#  Scenario Outline: Case #09 - Articles bulk action based on operation
#    Given I had articles data like <update_articles_file> in database and request authenticated success
#    When I make a request PATCH /articles/bulk to server
#    Then I should see response body like <result>
#    Examples:
#      | update_articles_file    | result |
#      | update_articles_01.json | true   |
#      | update_articles_02.json | false  |
#
#  #Case GET /tags
#  Scenario Outline: Find all tags
#    Given Data tags like <input_file> stored in database and request authenticated success
#    When I make a request GET /tags to server
#    Then I should see in response header Content-Type is <content_type>, HTTP status code is <http_status_code>, response tags like file <expect_file>
#    Examples:
#      | content_type     | http_status_code | expect_file    |
#      | application/json | 200              | tags-init.json |
#
#  #Case POST /tags
#  Scenario Outline: Find all tags
#    Given Data tags like <input_file> stored in database and request authenticated success
#    When I make a request GET /tags to server
#    Then I should see in response header Content-Type is <content_type>, HTTP status code is <http_status_code>, response tags like file <expect_file>
#    Examples:
#      | content_type     | http_status_code | expect_file |
#      | application/json | 200              | tags.json   |
#
#  #case GET /tags?search=:search
#  Scenario Outline: Search tags by char
#    Given Data tags like <input_file> stored in database and request authenticated success
#    When I make a request GET /tags?search=:search with search = <search_char>
#    Then I should see response tags like file <expect_file>
#    Examples:
#      | search_char | expect_file             |
#      | lost        | tags_search_result.json |
#      | blabla      | tags_search_result.json |






