@AuthProcess @regression
Feature: Verify the login and signup functionality

  @valid_login
  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I click on the login button
    When I enter valid username "saadsaadcs@gmail.com"
    And I enter valid password "Admin999@"
    And I click the login button
    Then I should be logged in successfully
    And I log out from the application
    Then I should be redirected back to the login page

  @createNewAccountForgetPassword
  Scenario Outline: Create a new account and verify the functionality of forget password
    Given I am on the login page
    When I click on the login button
    And I click on the create new account
    And I enter all the required details to create a new account "<firstName>" "<lastName>" "<emaildomain>" "<company_Name>" "<contact_number>" "<password>" "<confirm_password>"
    Then I navigate to the GetNada website
    Then I perform the login process with the following deatils "<password>"
    When I click on the login button
    And I click on forget password link
    And I enter the email address
    Then I navigate to the GetNada website to generate the password reset link
    Then I should be able to update the password using the new password "<new_password>" and confirm password "<confirm_new_password>"

    Examples:
      | firstName | lastName | emaildomain | company_Name | contact_number | password  | confirm_password | new_password | confirm_new_password |
      | John      | Doe      | getnada.com | Testing QA   |     8541256325 | Test@1234 | Test@1234        | TestQA@3210  | TestQA@3210          |


