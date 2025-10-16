@emailContactSection @regression
Feature: Manage email contact section

  Background:
    Given I am on the login page
    When I click on the login button
    When I enter valid username "saadsaadcs@gmail.com"
    And I enter valid password "Admin999@"
    And I click the login button
    Then I should be logged in successfully
    Then I should dismiss the warming message

  @emailContacts
  Scenario Outline: Perform CRUD operations on an email contact list
    When I navigate to the Contacts page
    And I create a new contact list named "<contact_Name>"
    And I update the newly created contact list by renaming "<contact_Name>" to "<update_contact_name>"
    Then I delete the updated contact list "<update_contact_name>"


    Examples:
      | contact_Name         | update_contact_name       |
      | Testing Contact list | newly update contact list |
