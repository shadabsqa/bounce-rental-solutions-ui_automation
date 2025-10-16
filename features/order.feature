@orders @regression
Feature: Verify the order Functionality

  Background:
    Given I am on the login page
    When I click on the login button
    When I enter valid username "saadsaadcs@gmail.com"
    And I enter valid password "Admin999@"
    And I click the login button
    Then I should be logged in successfully
    Then I should dismiss the warming message

  @orderPurchaseCardDetails
  Scenario Outline: Verify backend order after complete purchase
    When I navigate to the website page
    And I enter all the required details "<firstName>" "<lastName>" "<email>" "<address>" "<city>" "<state>" "<zip>" "<phone>" "<coupon_code>" "<card_number>" "<exp_date>" "<cvc>" "<zip>"
    And I complete the product purchase for the customer email address "<email>" and cancel the order

    Examples:
      | firstName | lastName | email                | address                                 | city     | state    | zip   | phone      | coupon_code | card_number      | exp_date | cvc | zip   |
      | John      | Doe      | john.doe@yopmail.com | 1809 Silvery Ln, Dearborn, MI 48128, US | Dearborn | Michigan | 48128 | 9639688088 | welcome10   | 4242424242424242 |     1028 | 123 | 12345 |

  @editCreatedOrder
  Scenario Outline: Edit the order and verify the functionality of billing, reports, and batch print 
    When I navigate to the website page
    And I enter all the required details "<firstName>" "<lastName>" "<email>" "<address>" "<city>" "<state>" "<zip>" "<phone>" "<coupon_code>"
    And I update some details in the backend for the customer email address "<email>" such as "<update_phone>" add a "<note>" and update payment mode to "<payment_type>"
    And I send the invoice and verify the invoice details on the billing page
    And I click on process payment for the customer email address "<email>" and verify success payment on the billing payment page
    And I click on the reports section and verify the customer report, product report, order report for the customer email address "<email>" and product name is "<product_name>"
    And I click on the batch print section and verify batch process for the customer email address "<email>"
    And I cancel the order created for the customer with email address "<email>"
    Then I un-cancel the previously canceled order for the customer with email address "<email>"
    Then I delete the created order for the customer with email address "<email>"

    Examples:
      | firstName | lastName | email                | address                                  | city     | state    | zip   | phone      | coupon_code | update_phone | note                   | payment_type | product_name      |
      | John      | Doe      | john.doe@yopmail.com | 1809 Silvery Ln, Dearborn, MI 48128, USA | Dearborn | Michigan | 48128 | 9639688088 | welcome10   |   9652145247 | test the created order | Venmo        | Wet Bounce Houses |

  @customer
  Scenario Outline: Verify customer management functionality
    When I navigate to the Customers page
    And I add a new customer with the following details: "<firstName>", "<lastName>", "<address>", "<city>", "<state>", "<zip>", "<phone>"
    Then I click on the reports and verify the customer report
    And I update the customer details whose email is "<email>" with new update phone number "<update_phone_number>"
    Then I delete the customer whose email is "<email>"

    Examples:
      | firstName | lastName | address               | city      | state  | zip   | phone   | update_phone_number |
      | John      | Doe      | 3355 S Las Vegas Blvd | Las Vegas | Nevada | 89109 | 9639688 |          7854212365 |

  @manualOrder
  Scenario Outline: Verify customer management functionality
    When I navigate to the Manual Order page
    And I click on the new customer button and add new customer with the following details: "<firstName>", "<lastName>", "<address>", "<city>", "<state>", "<zip>", "<phone>"
    And I complete the manual order for the newly added customer and selected the product "<product_name>", "<start_time>", "<end_time>"
    And I navigate to the all order page and deleted the created order
    Then I navigate to the customer page and delete the newly created customer

    Examples:
      | firstName | lastName | email                | address               | city      | state  | zip   | phone   | product_name             | start_time | end_time |
      | John      | Doe      | john.doe@yopmail.com | 3355 S Las Vegas Blvd | Las Vegas | Nevada | 89109 | 9639688 | Cheverolet Corvette 1961 |      11:00 |    11:00 |
