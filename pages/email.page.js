import config from '../configs/config.js';

export class EmailPage {
    constructor(page) {
        this.page = page;

        // ===== NAV / PAGE CONTROLS ===
        this.emailDropdown= page.locator("//a[normalize-space(.)='Email']")
        this.contactsLink= page.locator('[href="/contractors/contact_lists"]')
        this.addNewContactListButton= page.locator('[href*="contact_lists/new"]')
        this.contactNameInputField= page.locator('#contact_list_name')
        this.submitButton= page.locator('[type="submit"]')
        this.listCreatedSuccessMesage= page.locator("//*[contains(text(),'List created')]")
        this.contactUpdatedSuccessMessage= page.locator("//*[contains(text(),'Contact was successfully updated')]")
        this.contactDeleteSuccessMessage= page.locator("//*[contains(text(),'Contact list was successfully deleted')]")

    }

    async navigateToContactList()
    {
        await this.page.waitForTimeout(2000)
        await this.emailDropdown.click()
        await this.page.waitForTimeout(2000)
        await this.contactsLink.click()
    
    }

    async addNewContactList(contactName)
    {
        await this.page.waitForTimeout(2000)
        await this.addNewContactListButton.click()
        await this.page.waitForTimeout(3000)
        await this.contactNameInputField.fill(contactName)
        await this.submitButton.click()
        await this.listCreatedSuccessMesage.waitFor({ state: 'visible', timeout: 10000 })
    }

    async editNewlyCreatedContactList(contactname, updatecontactname)
    {
             await this.page.waitForTimeout(3000)
        // Locate the row that contains the contact list name
        const row = this.page.locator(`//tr[.//td[normalize-space()="${contactname}"]]`).first();
        await row.scrollIntoViewIfNeeded(); // ensure the row is vertically visible

        // Locate the Edit button inside that row
        const editBtn = row.locator('a[title="Edit"], button[title="Edit"]').first();

        // --- Make sure the edit icon is visible horizontally ---
        await editBtn.evaluate((el) => {
        // find the nearest horizontal scroller (adjust selectors if your table uses custom wrappers)
         const scroller =
           el.closest('.overflow-x-auto, .table-responsive, .k-grid-content, .k-virtual-scrollable-wrap, [style*="overflow-x"]');

        if (scroller) {
    const eRect = el.getBoundingClientRect();
    const sRect = scroller.getBoundingClientRect();

    // Adjust scrollLeft to bring element into horizontal view
    if (eRect.right > sRect.right) {
      scroller.scrollLeft += (eRect.right - sRect.right) + 40; // scroll right
    } else if (eRect.left < sRect.left) {
      scroller.scrollLeft -= (sRect.left - eRect.left) + 40; // scroll left
    }
  } else {
    // fallback: scroll into view if no scroller container
    el.scrollIntoView({ block: 'nearest', inline: 'center' });
  }
});

// Wait until Playwright considers it visible and clickable
await editBtn.waitFor({ state: 'visible', timeout: 5000 });

// ✅ Click the Edit button
await editBtn.click();

// Optional: wait for the edit form or page to appear
await this.page.waitForLoadState('domcontentloaded');

await this.contactNameInputField.fill(updatecontactname)

await this.submitButton.click()

await this.contactUpdatedSuccessMessage.waitFor({ state: 'visible', timeout: 10000 })
}

async deleteNewlyCreatedContactList(contactname)
{
     await this.page.waitForTimeout(3000)
      // Row that contains the email
  const row = this.page.locator(`//tr[.//td[normalize-space()="${contactname}"]]`).first();
  await row.waitFor({ state: 'visible', timeout: 20000 })
  await row.scrollIntoViewIfNeeded(); // vertical into view

  // Delete button inside that row
  const deleteBtn = row.locator('a[title="Delete"], button[title="Delete"]').first();

  // --- Make sure the delete icon is visible horizontally ---
  await deleteBtn.evaluate((el) => {
    // find the nearest horizontal scroller (adjust selectors if your app differs)
    const scroller =
      el.closest('.overflow-x-auto, .table-responsive, .k-grid-content, .k-virtual-scrollable-wrap, [style*="overflow-x"]');

    if (scroller) {
      const eRect = el.getBoundingClientRect();
      const sRect = scroller.getBoundingClientRect();

      // If the element is clipped on the right or left, adjust scrollLeft
      if (eRect.right > sRect.right) {
        scroller.scrollLeft += (eRect.right - sRect.right) + 40; // small padding
      } else if (eRect.left < sRect.left) {
        scroller.scrollLeft -= (sRect.left - eRect.left) + 40;
      }
    } else {
      // fallback: center in viewport
      el.scrollIntoView({ block: 'nearest', inline: 'center' });
    }
  });

  // Wait until Playwright considers it actually visible & actionable
  await deleteBtn.waitFor({ state: 'visible', timeout: 5000 });

  // --- Click and accept the confirm dialog ---
  await Promise.all([
    this.page.waitForEvent('dialog').then(d => d.accept()), // set BEFORE clicking
    deleteBtn.click()
  ]);
  // await this.page.waitForTimeout(5000)
  await this.contactDeleteSuccessMessage.waitFor({ state: 'visible', timeout: 10000 })
}
}