@niche-api
Feature: Interact with Niche Api
  In order to provide more helpful data to End User
  As a Controller, I want to interact with Niche Api

  Background:
    Given I had a list of niches (api)

    """
  [
  {
    "modifiedTime": "2015-07-02T07:42:03.563Z",
    "code": "weight-loss",
    "name": "Weight Loss",
    "description": "All about weight loss",
    "__v": 0,
    "createdTime": "2015-07-02T07:40:01.562Z",
    "keywords": []
  },
  {
    "modifiedTime": "2015-07-02T07:43:03.564Z",
    "code": "build-muscle",
    "name": "Build Muscle",
    "description": "All about build mass muscle fast",
    "__v": 0,
    "createdTime": "2015-07-02T07:41:02.564Z",
    "keywords": []
  },
  {
    "modifiedTime": "2015-07-02T07:44:03.564Z",
    "code": "herpes",
    "name": "Herpes",
    "description": "Natural Herpes Treatment",
    "__v": 0,
    "createdTime": "2015-07-02T07:41:03.584Z",
    "keywords": []
  },
  {
    "modifiedTime": "2015-07-02T07:45:03.566Z",
    "code": "fat-loss",
    "name": "Fat Loss",
    "description": "How to lose fat safely & naturally",
    "__v": 0,
    "createdTime": "2015-07-02T07:41:04.566Z",
    "keywords": []
  },
  {
    "modifiedTime": "2015-07-02T07:46:03.567Z",
    "code": "hemorrhoids",
    "name": "Hemorrhoids",
    "description": "Hemorrhoids Treatment",
    "__v": 0,
    "createdTime": "2015-07-02T07:41:04.567Z",
    "keywords": []
  },
  {
    "modifiedTime": "2015-07-02T07:47:03.568Z",
    "code": "psoriasis",
    "name": "Psoriasis",
    "description": "Psoriasis Treatment",
    "__v": 0,
    "createdTime": "2015-07-02T07:41:22.568Z",
    "keywords": []
  },
  {
    "modifiedTime": "2015-07-02T07:48:03.569Z",
    "code": "aquaponics",
    "name": "Aquaponics",
    "description": "How to build a Aquaponics system",
    "__v": 0,
    "createdTime": "2015-07-02T07:41:23.569Z",
    "keywords": []
  },
  {
    "modifiedTime": "2015-07-02T07:49:03.570Z",
    "code": "dog-food",
    "name": "Dog Food",
    "description": "Dog Food Secrets",
    "__v": 0,
    "createdTime": "2015-07-02T07:41:06.570Z",
    "keywords": []
  },
  {
    "modifiedTime": "2015-07-02T07:50:03.571Z",
    "code": "dog-training",
    "name": "Dog Training",
    "description": "Dog Training Secrets",
    "__v": 0,
    "createdTime": "2015-07-02T07:41:07.571Z",
    "keywords": []
  },
  {
    "modifiedTime": "2015-07-02T07:51:03.572Z",
    "code": "vertical-jump",
    "name": "Vertical Jump",
    "description": "Vertical Jump Training",
    "__v": 0,
    "createdTime": "2015-07-02T07:41:08.571Z",
    "keywords": []
  },
  {
    "modifiedTime": "2015-07-02T07:52:03.572Z",
    "code": "dating-for-man",
    "name": "Dating for Man",
    "description": "Dating for Man Guide",
    "__v": 0,
    "createdTime": "2015-07-02T07:41:09.572Z",
    "keywords": []
  },
  {
    "modifiedTime": "2015-07-02T07:53:03.573Z",
    "code": "dating-for-woman",
    "name": "Dating for Woman",
    "description": "Dating for Woman Guide",
    "__v": 0,
    "createdTime": "2015-07-02T07:41:10.573Z",
    "keywords": []
  },
  {
    "modifiedTime": "2015-07-02T07:54:03.574Z",
    "code": "anxiety",
    "name": "Anxiety",
    "description": "Anxiety Treatment",
    "__v": 0,
    "createdTime": "2015-07-02T07:41:11.574Z",
    "keywords": []
  },
  {
    "modifiedTime": "2015-07-02T07:55:03.574Z",
    "code": "heart-burn",
    "name": "Heart Burn",
    "description": "Heart Burn Treatment",
    "__v": 0,
    "createdTime": "2015-07-02T07:41:12.574Z",
    "keywords": []
  }
]
    """

  Scenario Outline: Get niches
    When I request api with page = <page>, itemsPerPage = <itemsPerPage>, sortDimension = <sortDimension>, sortColumn = <sortColumn>
    Then I should see the niches as file <result>
    Examples:
      | page | itemsPerPage | sortDimension | sortColumn   | result                   |
      | 1    | 10           | asc           | createdTime  | niche-result-case-1.json |
      | 1    | 10           | desc          | name         | niche-result-case-2.json |
      | 1    | 10           | desc          | modifiedTime | niche-result-case-3.json |
      | 2    | 10           | asc           | name         | niche-result-case-4.json |





