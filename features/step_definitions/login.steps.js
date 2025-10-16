import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page.js';
/** @type {LoginPage} */
let loginPage;
let username

Given('I am on the login page', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.navigate();
  await loginPage.closePopup()
  
});

When('I click on the login button', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.clickOnLogin()
});

When('I enter valid username {string}', async function (username) {
  await loginPage.enterUsername(username);
});

When('I enter valid password {string}', async function (password) {
  await loginPage.enterPassword(password);
});


When('I click the login button', async function () {
  await loginPage.clickLoginButton();
});

Then('I should be logged in successfully', async function () {
  await loginPage.getDashboardElement()  
});

Then('I log out from the application', async function () {
  await loginPage.logoutFromApplication()
});


Then('I should be redirected back to the login page', async function () {

  await loginPage.getLoginPage()
});

Then('I should dismiss the warming message', async function () {
  await loginPage.dismiss();

})


// Create new account

When('I click on the create new account', async function () {
  // Write code here that turns the phrase above into concrete actions

  await loginPage.clickOnCreateNewAccount()
})

When('I enter all the required details to create a new account {string} {string} {string} {string} {string} {string} {string}', async function (firstName, lastName, emaildomain, companyName, contactNumber, password, confirmPassword) {
  // Write code here that turns the phrase above into concrete actions

  username=await loginPage.createNewAccount(firstName, lastName, emaildomain, companyName, contactNumber, password, confirmPassword)
  
})

Then('I navigate to the GetNada website', async function () {
  // Write code here that turns the phrase above into concrete actions
  await loginPage.navigateGetnadaApplication(username)
})

Then('I perform the login process with the following deatils {string}', async function (password) {
  // Write code here that turns the phrase above into concrete actions
  await loginPage.verifyEmailAndLogin(username, password)
})

When('I click on forget password link', async function () {
  // Write code here that turns the phrase above into concrete actions
  loginPage = new LoginPage(this.page);
  await loginPage.clickOnForgetPasswordLink()
})

When('I enter the email address',async function () {
  // Write code here that turns the phrase above into concrete actions
  loginPage = new LoginPage(this.page);
  await loginPage.enterTheEmailAddress(username)
})

Then('I navigate to the GetNada website to generate the password reset link', async function () {
  // Write code here that turns the phrase above into concrete actions
  loginPage = new LoginPage(this.page);
  await loginPage.navigateGetnadaApplicationToResetPassword(username)
})

Then('I should be able to update the password using the new password {string} and confirm password {string}', async function (newPassword, confirmPassword) {
  // Write code here that turns the phrase above into concrete actions
  loginPage = new LoginPage(this.page);
  await loginPage.createNewPassword(newPassword,confirmPassword)
})



