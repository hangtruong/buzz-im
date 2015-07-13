@@article-ui
Feature: Edit Article
  In order to add target keyword to article to create anchor text
  As a marketer, I want to edit article manually
  
  Scenario: Insert paragraph contains target keyword to article
  Given I have the article without target keyword
  When I manually input the text with target keyword
  Then I should see the article with target keyword
  
  
  
  
