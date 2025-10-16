import config from '../configs/config.js';

export class RentalsPage {
    constructor(page) {
        this.page = page;

        // ===== NAV / PAGE CONTROLS =====
        this.RentalsDropdown = page.locator("//a[normalize-space(.)='Rentals']");
        this.RentalCategoriesButton = page.locator("//a[normalize-space(.)='Rental categories']");
        this.AddProductCatagoryButton = page.locator("//a[normalize-space(.)='Add Product Category']");

        // ===== CREATE FORM =====
        this.EnterCatagoryName = page.locator('[id="product_category_name"]');
        this.DisplayDropdown = page.locator('[id="product_category_status"]');
        this.DisplayDropdownOPtions = page.locator('[id*="product_category_st"] option');
        this.DisplayDropdownSelection = page.locator('[name="product_category[status]"] [value="true"]');
        this.ShowOnHomepageDropdown = page.locator('[id="product_category_is_featured"]');
        this.ShowOnHomepageSelection = page.locator('[name="product_category[is_featured]"] [value="false"]');
        this.FooterSelectionDropdown = page.locator('[id="product_category_show_in_footer"]');
        this.FooterSelection = page.locator('[id="product_category_show_in_footer"] [value="false"]');
        this.ImageInput = page.locator('//input[@type="file"]');
        this.CreateProductCatagory = page.locator('[type="submit"]');
        this.SuccessMessage = page.locator("//h5[contains(.,'successfully created.')]");
        this.categoryUpdateSuccessMessage= page.locator("//*[contains(text(),'Product Category was successfully updated')]")
        this.deleteCategorySuccessMessage= page.locator("//*[contains(text(),'Product Category was successfully deleted')]")

        // ===== LIST / EDIT HELPERS =====
        this.RowByName = (name) => this.page.locator(`//table//tr[.//td[normalize-space(.)='${name}']]`);
        this.EditLinkByName = (name) =>
            this.page.locator(`//table//tr[.//td[normalize-space(.)='${name}']]//a[contains(@href,'/product_categories') and contains(@href,'/edit')]`);
        this.EditNameInput = this.page.locator('#product_category_name');
        this.UpdateButton = this.page.locator(
            `//button[normalize-space(.)='Update Product Category'] | //input[@type='submit' and @value='Update Product Category']`
        );
        this.listUrlRegex = /\/product_categories(\b|\/)?(?!.*\/edit)/i;

       // ===== Promo Codes =====
       this.prompCodesLink= page.locator('[href="/contractors/discounts"]')
       this.addNewPromoCodesButton= page.locator('[href*="discounts/new"]')
       this.promoTitleInputField= page.locator("#discount_title")
       this.promoDescriptionInputField= page.locator('#discount_description')
       this.maxDiscountInputField= page.locator('#discount_max_discount')
       this.minPurchaseInputField= page.locator('#discount_min_purchase')
       this.typeDropDown= page.locator('select#discount_type')
       this.discountInputField= page.locator('#discount_amount')
       this.submitButton= page.locator('[type="submit"]')
       this.discountCreatedSuccessMessage= page.locator("//*[contains(text(),'Discount was successfully created')]")
       this.discountEditSuccessMessage= page.locator("//*[contains(text(),'Discount was successfully updated')]")
       this.discountDeleteSuccessMessage= page.locator("//*[contains(text(),'Discount was successfully deleted')]")

      // ======RENTALS PAGE LOCATORS======
        this.RentalItemsButton = page.locator("//a[normalize-space(.)='Rental items']");
        this.AddProductButton = page.locator("//a[normalize-space(.)='Add Product']");
        // ======= CREATE RENTAL ITEM =============
        this.ExistingCatagoryRadioButton = page.locator("//span[text()='Existing Category']/preceding-sibling::input");
        this.CatagoryDropdown = page.locator("#product_product_category_id");
        this.ItemNameInputfield = page.locator('[id="product_name"]');
        this.ItemSizeInputfield = page.locator("#product_size");
        this.ItemUnitQtyInputfield = page.locator("#product_units_in_stock");
        this.ItemOutletQtyInputfield = page.locator("#product_outlets");
        this.ItemShortDesInputfield = page.locator('[aria-label="Editor, product_short_description"]');
        this.ItemLongDesInputfield = page.locator('[aria-label="Editor, product_description"]');
        this.ProductTypeDropdown = page.locator('#product_product_type');
        this.BillingTypeDropdown = page.locator('#product_billing_type');
        this.DisplayonHomepageCheckbox = page.locator('#product_is_featured');
        this.CreateProductButton = page.locator('[value="Create Product"]');
        this.ItemCreationSuccessMessage = page.locator("//*[contains(text(),'Product was successfully created')]");
        this.productLink = page.locator("//a[text()='Products']");
        this.wetBounceHouseCategories = page.locator('[alt="Wet Bounce Houses"]');
        this.updateProductButton= page.locator('[value="Update Product"]')
        this.ItemUpdateSuccessMessage= page.locator("//*[contains(text(),'Product was successfully updated')]")
        this.itemDeleteSuccessMessage= page.locator("//*[contains(text(),'Product was successfully deleted')]")
       

    }

    // ===== UTIL: Unique name generator (DDMMYYYYHHMMSS) =====
    generateUniqueCategoryName(prefix = 'TestCategory') {
        const now = new Date();
        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth() + 1).padStart(2, '0'); // 0-based
        const yyyy = now.getFullYear();
        const HH = String(now.getHours()).padStart(2, '0');
        const MM = String(now.getMinutes()).padStart(2, '0');
        const SS = String(now.getSeconds()).padStart(2, '0');
        return `${prefix}${dd}${mm}${yyyy}${HH}${MM}${SS}`;
    }

    // ===== NAVIGATION =====
    async clickOnRentalsDropdown() {
      await this.RentalsDropdown.waitFor({ state: 'visible', timeout: 20000 })
        await this.RentalsDropdown.click();
        await this.RentalCategoriesButton.waitFor({ state: 'visible', timeout: 20000 })
        await this.RentalCategoriesButton.click();
    }

    // ===== CREATE =====
    async fillAddProductCatagoryDetails() {
      await this.AddProductCatagoryButton.waitFor({ state: 'visible', timeout: 20000 })
        await this.AddProductCatagoryButton.click();

        // --- OLD (hard-coded) ---
        // await this.EnterCatagoryName.fill('TestCatagoryRC');

        // --- NEW (unique per run) ---
        const uniqueName = this.generateUniqueCategoryName();
        await this.EnterCatagoryName.waitFor({ state: 'visible', timeout: 20000 })
        await this.EnterCatagoryName.fill(uniqueName);

        await this.DisplayDropdown.click();
        await this.page.waitForTimeout(500);
        await this.DisplayDropdown.selectOption({ value: "true" });

        await this.ShowOnHomepageDropdown.click();
        await this.ShowOnHomepageDropdown.selectOption({ value: "true" });

        // await this.FooterSelectionDropdown.click();
        // await this.FooterSelectionDropdown.selectOption({ value: "true" });

        await this.ImageInput.setInputFiles("Test Data/SDD Bounce.jpg");
        await this.CreateProductCatagory.click();

        await this.SuccessMessage.waitFor({ timeout: 10000 });

        // return unique name so test can use it
        return uniqueName;
    }

    async catagorySuccessfullyCreated() {
        await this.SuccessMessage.waitFor({ timeout: 10000 });
        await this.SuccessMessage.isVisible();
    }

    async verifyCateogryCreatwedOnWebsiteHomePage(categoryName)
    {
      await this.page.locator(`text=${categoryName}`).first().waitFor({ state: 'visible', timeout: 20000 })
        // Verify that the expected text appears on the page
        const isVisible = await this.page.locator(`text=${categoryName}`).first().isVisible();

        if (isVisible) {
          console.log(`✅ "${categoryName}" is visible`);
        } 
        else {
         console.log(`❌ "${categoryName}" not found`);
        }  

    }

    async editTheCategory(categoryName)
    {
      await this.page.waitForTimeout(3000)
        // Locate the row that contains the categoryName
        const row = this.page.locator(`//tr[.//td[normalize-space()="${categoryName}"]]`).first();
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

await this.page.waitForTimeout(2000)
await this.ShowOnHomepageDropdown.click();
await this.ShowOnHomepageDropdown.selectOption({ value: "false" });

await this.CreateProductCatagory.click();

await this.categoryUpdateSuccessMessage.waitFor({ state: 'visible', timeout: 10000 })

}

async deleteCategory(categoryName)
{
  await this.page.waitForTimeout(3000)
      // Row that contains the email
  const row = this.page.locator(`//tr[.//td[normalize-space()="${categoryName}"]]`).first();
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
  await this.deleteCategorySuccessMessage.waitFor({ state: 'visible', timeout: 10000 })
}

async verifyCategoryDeleteFromHomePage(categoryName)
{
    // Verify that the category no longer appears on the home page
const isVisible = await this.page.locator(`text=${categoryName}`).first().isVisible();

if (!isVisible) {
  console.log(`✅ "${categoryName}" is no longer visible on the home page`);
} else {
  console.log(`❌ "${categoryName}" is still present on the home page`);
}
}

//Promo codes:-
async navigateToPromoCodesPage()
{
  this.page.waitForTimeout(2000)
  this.RentalsDropdown.click()
  this.page.waitForTimeout(2000)
  this.prompCodesLink.click()
}

async createNewPromoCode(promotitle, description, maxdiscount, minpurchase, optionText, amount, percentage)
{
  await this.page.waitForTimeout(3000)
  await this.addNewPromoCodesButton.click()
  await this.page.waitForTimeout(3000)
  await this.promoTitleInputField.fill(promotitle)
  await this.promoDescriptionInputField.fill(description)
  await this.maxDiscountInputField.fill(maxdiscount)
  await this.minPurchaseInputField.fill(minpurchase)
   // Wait for dropdown to appear
  await this.typeDropDown.waitFor({ state: 'visible', timeout: 10000 });

  // Select option directly by visible text
  await this.page.selectOption('select#discount_type', { label: optionText });

  await this.page.waitForTimeout(2000)

  if(optionText==="Amount")
  {
    await this.discountInputField.fill(amount)
  }
  else if(optionText==="Percentage")
  {
    await this.discountInputField.fill(percentage)
  }

  await this.submitButton.click()

  await this.discountCreatedSuccessMessage.waitFor({ state: 'visible', timeout: 10000 })
}

async editTheNewlyCreatedPromo(promoname, editdescription)
{
  await this.page.waitForTimeout(3000)
  const row = this.page.locator(`//tr[.//td[normalize-space()="${promoname}"]]`).first();
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

await this.page.waitForTimeout(2000)

await this.promoDescriptionInputField.fill(editdescription)

await this.submitButton.click()

await this.discountEditSuccessMessage.waitFor({ state: 'visible', timeout: 10000 })

}

async deleteNewlyCreatedPromo(promoname)
{
  await this.page.waitForTimeout(3000)
   // Row that contains the promo name
  const row = this.page.locator(`//tr[.//td[normalize-space()="${promoname}"]]`).first();
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
  await this.discountDeleteSuccessMessage.waitFor({ state: 'visible', timeout: 10000 })
}

// *=====RENTAL ITEM METHODS=======*
     // ===== UTIL: Unique name generator (DDMMYYYYHHMMSS) =====
    generateUniqueItemName(prefix = 'TestItem') {
        const now = new Date();
        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth() + 1).padStart(2, '0'); // 0-based
        const yyyy = now.getFullYear();
        const HH = String(now.getHours()).padStart(2, '0');
        const MM = String(now.getMinutes()).padStart(2, '0');
        const SS = String(now.getSeconds()).padStart(2, '0');
        return `${prefix}${dd}${mm}${yyyy}${HH}${MM}${SS}`;
    }
    // Navigate To rental page-
    async navigateToRentalPage()
    {
        await this.page.waitForTimeout(2000)
        await this.RentalsDropdown.click();
        await this.page.waitForTimeout(2000)
        await this.RentalItemsButton.click();
        await this.page.waitForTimeout(2000)
    }
     async createNewItem(optionText, Dimentions, Qty, Outlet, ShortDescription, LongtDescription, Producttype, Billingtype)
     {
        await this.page.waitForTimeout(2000)
        await this.AddProductButton.click();
        await this.page.waitForTimeout(2000)
        await this.ExistingCatagoryRadioButton.click()
        await this.CatagoryDropdown.waitFor({ state: 'visible', timeout: 10000 });
        await this.page.selectOption('#product_product_category_id', { label: optionText });
       const uniqueName = this.generateUniqueItemName();
        await this.ItemNameInputfield.fill(uniqueName);
        await this.ItemSizeInputfield.fill(Dimentions);
        await this.ItemUnitQtyInputfield.fill(Qty);
        await this.ItemOutletQtyInputfield.fill(Outlet);
        await this.page.waitForTimeout(2000)
        await this.DisplayonHomepageCheckbox.click();
        await this.page.waitForTimeout(2000)
        await this.CreateProductButton.click();
        await this.ItemCreationSuccessMessage.waitFor({ state: 'visible', timeout: 10000})
        
        return uniqueName;
    }

    async verifyProductAddedOnWebsiteProductPage(uniqueName)
    {
      await this.productLink.click();
      await this.page.waitForTimeout(2000)
      await this.wetBounceHouseCategories.click()
      await this.page.waitForTimeout(5000)
          // Verify that the category no longer appears on the home page

      await this.page.locator(`text=${uniqueName}`).first().waitFor({ state: 'visible', timeout: 20000})
      const isVisible = await this.page.locator(`text=${uniqueName}`).first().isVisible();

      if (isVisible) {
        console.log(`"${uniqueName}" is visible on the product page`);
      } else {
        console.log(`"${uniqueName}" is no longer present on the product page`);
      }

  }

  async editTheNewlyCreatedRentalItems(uniqueName, updateQty)
  {
    await this.page.waitForTimeout(3000)
  const row = this.page.locator(`//tr[.//td[normalize-space()="${uniqueName}"]]`).first();
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

await this.page.waitForTimeout(2000)

await this.ItemUnitQtyInputfield.fill(updateQty)

await this.updateProductButton.click()

await this.ItemUpdateSuccessMessage.waitFor({ state: 'visible', timeout: 10000})
}
 
async deleteNewlyCreatedItem(uniqueName)
{
  await this.RentalItemsButton.click()
  await this.page.waitForTimeout(3000)
   // Row that contains the rental item
  const row = this.page.locator(`//tr[.//td[normalize-space()="${uniqueName}"]]`).first();
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
  await this.itemDeleteSuccessMessage.waitFor({ state: 'visible', timeout: 10000 })
}

   async verifyProductRemoveOnWebsiteProductPage(uniqueName)
    {
      await this.productLink.click();
      await this.page.waitForTimeout(2000)
      await this.wetBounceHouseCategories.click()
      await this.page.waitForTimeout(5000)
          // Verify that the category no longer appears on the home page

      
      const isVisible = await this.page.locator(`text=${uniqueName}`).first().isVisible();

      if (!isVisible) {
        console.log(`"${uniqueName}" is no longer visible on the product page`);
      } else {
        console.log(`"${uniqueName}" is still present on the product page`);
      }

  }
}
