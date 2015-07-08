@articles-api
#features/research-market/article-api.feature
Feature: Manage articles API
  As a developer
  I want to request articles APIs
  So that I receive needed data to develop manage articles feature in app client

  #Case GET /niches/niche_slug/articles
  Scenario Outline: Find all articles belong to niche by niche slug
    #Given background
    Given Request authenticated success
    When I make a request GET /niches/niche_slug/articles to server
    Then I should see in response header Content-Type is <content_type>, HTTP status code is <http_status_code>
    And I should see response list articles like file <expect_file>
    Examples:
      | content_type     | http_status_code | expect_file   |
      | application/json | 200              | articles.json |

  #Case GET /niches/niche_slug/article?page=:page&per_page=:per_page&order_by=:order_by&sort_column=:sort_column
  Scenario Outline: Find articles belong to niche by niche_slug with padding, sort, order
    Given Request authenticated success
    When I make request GET /niches/niche_slug/article with params like page = <page>, item per page = <per_page>, order by = <order_by>, sort column = <sort_column>
    Then I should see list articles like file <expect_file>
    Examples:
      | page | per_page | order_by | sort_column | expect_file      |
      | 1    | 10       | asc      | title       | articles_01.json |
      | 2    | 10       | desc     | title       | articles_02.json |

  #Case GET /niches/niche_slug/article?page=:page&per_page=:per_page&order_by=:order_by&sort_column=:sort_column&spintax=:spintax_flag&tag=:tag_flag&searchText=:searchText&tag=:tag

  #Case GET /niches/niche_slug/article?spintax=:spintax_flag&tag=:tag_flag
  Scenario Outline: Find articles belong to niche by niche_slug with without spintax and/or without tag
    Given Request authenticated success
    When I make request GET /niches/niche_slug/article?spintax=:spintax_flag&tag=:tag_flag with params like spintax flat= <spintax_flag>, tag flat=<tag_flag>
    Then I should see list articles like file <expect_file>
    Examples:
      | spintax_flag | tag_flag | expect_file                                   |
      | true         | false    | articles_without_spintax.json                 |
      | false        | true     | articles_without_tax.json                     |
      | true         | true     | articles_without_spintax_and_without_tax.json |

  #Case GET /niches/niche_slug/article?searchText=:searchText
  Scenario Outline: Find articles belong to niche by niche_slug with searchText
    Given Request authenticated success
    When I make request GET /niches/niche_slug/article?searchText=:searchText with params like search text= <search_text>
    Then I should see list articles like file <expect_file>
    Examples:
      | search_text | expect_file                         |
      | article     | articles_search_with_result.json    |
      | blabla      | articles_search_without_result.json |

  #Case GET /niches/niche_slug/article?tag=:tag
  Scenario Outline: Find articles belong to niche by niche_slug with tag
    Given Request authenticated success
    When I make request GET /niches/niche_slug/article?tag=:tag with params like search text= <tag>
    Then I should see list articles like file <expect_file>
    Examples:
      | tag        | expect_file                      |
      | lost,heath | articles_tag_with_result.json    |
      | blabla     | articles_tag_without_result.json |

  #Case POST /niches/niche_slug/articles/upload
  Scenario Outline: Import file articles.zip has many file article_title.txt. Each article_tile.txt formatted markdown style
    Given I had articles.zip and request authenticated success
    When I make request POST /niches/niche_slug/articles/upload with file <input_file>
    Then I should be see result process import like <result>
    Examples:
      | input_file      | result |
      | articles_01.zip | true   |
      | articles_02.zip | false  |

  #Case POST /niches/niche_slug/keywords/upload
  Scenario Outline: Import file keywords.csv
    Given I had articles.zip and request authenticated success
    When I make request POST /niches/niche_slug/keywords/upload with file <input_file>
    Then I should be see result process import like <result>
    Examples:
      | input_file      | result |
      | keywords_01.csv | true   |
      | keywords_02.csv | false  |

  #Case PUT /articles/:article_slug
  Scenario Outline: Update article by article slug
    Given I had article like file <input_file> and request authenticated success
    When I make request PUT /articles/:article_slug
    Then I should see response body like <result>
    Examples:
      | input_file              | result |
      | update_articles_01.json | true   |
      | update_articles_02.json | false  |


  #Case PATCH /articles/bulk
  Scenario Outline: Articles bulk action based on operation
    Given I had a file like <input_file> and request authenticated success
    When I make a request PATCH /articles/bulk to server
    Then I should see response body like <result>
    Examples:
      | input_file              | result |
      | update_articles_01.json | true   |
      | update_articles_02.json | false  |

  #Case GET /tags
  Scenario Outline: Find all tags
    Given I had a file like <input_file> and request authenticated success
    When I make a request GET /tags to server
    Then I should see in response header Content-Type is <content_type>, HTTP status code is <http_status_code>
    And I should see response tags like file <expect_file>
    Examples:
      | content_type     | http_status_code | expect_file |
      | application/json | 200              | tags.json   |

  #Case POST /tags
  Scenario Outline: Find all tags
    Given I had a file like <input_file> and request authenticated success
    When I make a request GET /tags to server
    Then I should see in response header Content-Type is <content_type>, HTTP status code is <http_status_code>
    And I should see response tags like file <expect_file>
    Examples:
      | content_type     | http_status_code | expect_file |
      | application/json | 200              | tags.json   |

  #case GET /tags?search=:search
  Scenario Outline: Search tags by char
    Given I had a file like <input_file> and request authenticated success
    When I make a request GET /tags?search=:search with search = <search_char>
    And I should see response tags like file <expect_file>
    Examples:
      | search_char | expect_file             |
      | lost        | tags_search_result.json |
      | blabla      | tags_search_result.json |






