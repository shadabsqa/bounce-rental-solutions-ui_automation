import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import {OrdersPage} from '../../pages/order.page.js'
/** @type {OrdersPage} */
let orderPage;
let mainPage; 
import {RentalsPage} from '../../pages/rentals.page.js'
/** @type {RentalsPage} */
let rentalPage;
let newCategoriesName
let uniqueName

When('I navigate to Rental Categories', async function () {
rentalPage=new RentalsPage(this.page)
await rentalPage.clickOnRentalsDropdown()

});

Then('I add a new Product Category with required details', async function () {
  rentalPage=new RentalsPage(this.page)
   newCategoriesName=await rentalPage.fillAddProductCatagoryDetails()

});

Then('the category should be created successfully', async function () {
  rentalPage=new RentalsPage(this.page)
  await rentalPage.catagorySuccessfullyCreated()
});

Then('I navigate to the website and confirm that the newly created category appears on the home page',  async function () {
  // Write code here that turns the phrase above into concrete actions

  orderPage = new OrdersPage(this.page);
  mainPage = this.page; 
  this.page = await orderPage.clickOnTheWebsiteLink();
  await orderPage.dismissPopup()
  rentalPage=new RentalsPage(this.page)
  await rentalPage.verifyCateogryCreatwedOnWebsiteHomePage(newCategoriesName)

})

Then('Edit the newly created category and verify that the changes are saved successfully.', async function () {
  // Write code here that turns the phrase above into concrete actions

  await this.page.close();
  this.page = mainPage;
  await this.page.bringToFront();
  console.log('Returned to main website page');
  await this.page.waitForTimeout(3000)
  rentalPage=new RentalsPage(this.page)
  rentalPage.editTheCategory(newCategoriesName)


})

Then('Delete the newly created category and confirm that it no longer appears on the home page.',async function () {
  // Write code here that turns the phrase above into concrete actions

  rentalPage=new RentalsPage(this.page)
  await rentalPage.deleteCategory(newCategoriesName)
  orderPage = new OrdersPage(this.page);
  mainPage = this.page; 
  this.page = await orderPage.clickOnTheWebsiteLink();
  await orderPage.dismissPopup()
  rentalPage=new RentalsPage(this.page)
  await rentalPage.verifyCategoryDeleteFromHomePage(newCategoriesName)

})

When('I navigate to the Promo codes', async function () {
  // Write code here that turns the phrase above into concrete actions
  rentalPage=new RentalsPage(this.page)
  await rentalPage.navigateToPromoCodesPage()
})

When('I create a new promo code with following deatils {string} {string} {string} {string} {string} {string} {string}', async function (promotitle, description, maxdiscount, minpurchase, optionText, amount, percentage) {
  // Write code here that turns the phrase above into concrete actions

  rentalPage=new RentalsPage(this.page)
  await rentalPage.createNewPromoCode(promotitle, description, maxdiscount, minpurchase, optionText, amount, percentage)

})

When('I update the newly created promo code {string} {string}', async function (promotitle, description) {
 

  rentalPage=new RentalsPage(this.page)
  await rentalPage.editTheNewlyCreatedPromo(promotitle, description)
})

Then('I delete the newly created promo code {string}',async function (promotitle) {
 

   rentalPage=new RentalsPage(this.page)
   await rentalPage.deleteNewlyCreatedPromo(promotitle)
})

// Rental Items steps:

When('I navigate to Rental Items', async function () {
rentalPage=new RentalsPage(this.page)
await rentalPage.navigateToRentalPage()
});

When('I add a new Product with required details {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string}', async function (optionText, Dimentions, Qty, Outlet, ShortDescription, LongtDescription, Producttype, Billingtype) {
  
  rentalPage=new RentalsPage(this.page)
  uniqueName=await rentalPage.createNewItem(optionText, Dimentions, Qty, Outlet, ShortDescription, LongtDescription, Producttype, Billingtype)
  })

When('I navigate to the website and confirm that the newly created item appears on the home page',async function () {
  

  orderPage = new OrdersPage(this.page);
  mainPage = this.page; 
  this.page = await orderPage.clickOnTheWebsiteLink();
  await orderPage.dismissPopup()
  rentalPage=new RentalsPage(this.page)
  await rentalPage.verifyProductAddedOnWebsiteProductPage(uniqueName)
})

When('Edit the newly created item update the quatity {string} and verify that the changes are saved successfully', async function (updateQty) {
  
  await this.page.close();
  this.page = mainPage;
  await this.page.bringToFront();
  console.log('Returned to main website page');
  await this.page.waitForTimeout(3000)
  rentalPage=new RentalsPage(this.page)
  await rentalPage.editTheNewlyCreatedRentalItems(uniqueName, updateQty)

})

Then('Delete the newly created item and confirm that it no longer appears on the home page', async function () {
  
  rentalPage=new RentalsPage(this.page)
  await rentalPage.deleteNewlyCreatedItem(uniqueName)
  orderPage = new OrdersPage(this.page);
  mainPage = this.page; 
  this.page = await orderPage.clickOnTheWebsiteLink();
  await orderPage.dismissPopup()
  rentalPage=new RentalsPage(this.page)
  await rentalPage.verifyProductRemoveOnWebsiteProductPage(uniqueName)
})











