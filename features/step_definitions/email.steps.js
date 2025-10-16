import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import {EmailPage} from '../../pages/email.page.js'
/** @type {EmailPage} */
let emailPage;

When('I navigate to the Contacts page', async function () {
  // Write code here that turns the phrase above into concrete actions
  emailPage=new EmailPage(this.page)
  await emailPage.navigateToContactList()
})

When('I create a new contact list named {string}', async function (contactname) {
  // Write code here that turns the phrase above into concrete actions
  await emailPage.addNewContactList(contactname)
})

When('I update the newly created contact list by renaming {string} to {string}', async function (contactname, newContactname) {
  // Write code here that turns the phrase above into concrete actions
  await emailPage.editNewlyCreatedContactList(contactname, newContactname)
})

Then('I delete the updated contact list {string}',async function (newContactname) {
  // Write code here that turns the phrase above into concrete actions

  await emailPage.deleteNewlyCreatedContactList(newContactname)
})

