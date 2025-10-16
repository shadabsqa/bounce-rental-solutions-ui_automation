import config from '../configs/config.js';

export class OrdersPage {
    constructor(page) {
        this.page = page;
        this.initLocators(page);
    }

    initLocators(page) {
        this.websitePageLink = page.locator('[title="My Website"]');
        this.popup= page.locator('a[class="u-close-button"]')
        this.productLink = page.locator("//a[text()='Products']");
        this.wetBounceHouseCategories = page.locator('[alt="Wet Bounce Houses"]');
        this.firstProduct = page.locator('[alt*="Cheverolet Corvette"]');
        this.fullDay= page.locator('input[id="Full day"]')
        this.halfDay= page.locator('input[id="Half day"]')
        this.startDate= page.locator('[aria-controls*="start_date_dateview"]')
        this.startTime= page.locator('[aria-controls="start_date_timeview"]')
        this.endDate= page.locator('[aria-controls*="end_date_dateview"]')
        this.endTime= page.locator('[aria-controls="end_date_timeview"]')
        this.startDay= page.locator('[class="k-link"]')
        this.time= page.locator('[role="listbox"] [role="option"]')
        this.bookNowButton= page.locator("//button[text()='Book now']")
        this.addCartButton= page.locator('[href="/customers/carts"]')
        this.procedCheckoutButton= page.locator('[href="/customers/checkout"]')

        // order details
        this.orderFirstName= page.locator('[id="order_bill_to_first_name"]')
        this.orderLastName= page.locator('[id="order_bill_to_last_name"]')
        this.customerEmail= page.locator('[id="customer_email"]')
        this.orderAddress= page.locator('[id="order_bill_to_address"]')
        this.address= page.locator("//span[text()='Silvery Ln']")
        this.orderCity= page.locator('[id="order_bill_to_city"]')

        this.stateSelect= page.locator('#state, [name="order[bill_to_state]"]');
        this.zipCode= page.locator('[id="order_bill_to_zipcode"]');
        this.phoneNumber= page.locator('[id="order_bill_to_contact_value"]');
        this.firstTipRadioButton= page.locator('[id="tip_option_1"]')
        this.couponCodeField= page.locator('[id="coupon_code"]')
        this.applyButton= page.locator('[name="button"]')

        this.sameBillingAddress= page.locator('[id="order_same_billing_address"]')
        this.damageCheckbox= page.locator('[id="order_setup_insurance"]');
        this.agreeCheckOut= page.locator('[id="agreeterms"]')
        this.placeOrder= page.locator('[id="place-older"]')
        this.orderSuccessfullyPlaced= page.locator("//*[text()='Thank you for your Order']")

        // Creadit card details:-
        this.creaditCardRadioButton= page.locator("#payment_type_stripe")
        this.iframe = page.frameLocator('[title="Secure card payment input frame"]');
        this.cardNumberInputField= this.iframe.locator('[name="cardnumber"]')
        this.expdateInputField= this.iframe.locator('[name="exp-date"]')
        this.cvcInputField= this.iframe.locator('[name="cvc"]')
        this.zipInputField= this.iframe.locator('[name="postal"]')


        // Route planner:-
        this.rentalPlannerLink= page.locator('[href*="route_planning"]')
        this.addTruckButton= page.locator("//button[contains(text(),'Add Truck')]")
        this.enterFieldsLocation= page.locator('[placeholder="Enter a location"]')
        this.saveRouteButton= page.locator("//button[text()='Save Routes']")
        this.successUpdateMessage= page.locator("//*[contains(text(),'successfully updated.')]")
        this.removeTruckIcon= page.locator("[class*='remove_fields ']")
        this.rentalChangeMessage= page.locator("//*[contains(text(),'Route changes made.')]")


        //Add Customer:
        this.ordersLink= page.locator("//a[normalize-space()='Orders']")
        this.customerLink= page.locator('[href="/contractors/customers"]')
        this.newCustomerLink= page.locator('[href*="customers/new"]')
        this.cutomerEmailField= page.locator('#customer_email')
        this.CustomerPhone = page.locator('#customer_contact_value')
        this.customerFirstName= page.locator('#customer_first_name')
        this.customerLastName = page.locator('#customer_last_name')
        this.customerAddress= page.locator('#customer_address')
        this.customerCity= page.locator('#customer_city')
        this.customerState = page.locator('#customer_state')
        this.countryDropDown= page.locator('#customer_country_id')
        this.customerZipCode= page.locator('#customer_zipcode')
        this.submitButton= page.locator('[type="submit"]')
        this.customerCreatedSuccessfully= page.locator("//*[contains(text(),'Customer was successfully created')]");
        this.nextPagination= page.locator('[aria-label="Next"]')
        this.lastPagination= page.locator('[aria-label="Last"]')
        this.deleteIcon= page.locator('[title="Delete"]')
        this.editIcon= page.locator('title="Edit"')
        this.customerEditedSuccessfully= page.locator("//*[contains(text(),'Customer was successfully updated')]")
        this.customerDeletedSuccessfully= page.locator("//*[contains(text(),'Customer was successfully deleted')]")

        //All order:
        this.allOrders= page.locator("//a[text()='All Orders']")
        this.review= page.locator('[value="Review"]')
        this.updateOrderMessage= page.locator("//*[contains(text(),'Order was successfully Updated')]")
        this.processPayment= page.locator('[value="Process Payment"]')
        this.cancelOrder= page.locator('[title="Cancel"]')
        this.cancelAnOrder= page.locator('[value="Cancel Order"]')
        this.orderCancelSuccessMessage= page.locator("//*[contains(text(),'Order has been cancelled')]")
        this.deleteOrderSuccessMessage= page.locator("//*[contains(text(),'Order was successfully deleted')]")

        // Edit created order:
        this.editAddressLink= page.locator('a[data-modal-toggle*="address"]')
        this.contactNumberField= page.locator('#order_bill_to_contact_value')
        this.updateAddressButton= page.locator("//*[contains(text(),'Update Order Address')]/../../descendant::input[@type='submit']")
        this.addressUpdateSuccessMessage= page.locator("//*[contains(text(),'Addresses have been updated sucessfully')]")
        this.editOrderDetails= page.locator('a[data-modal-toggle*="condition"]')
        this.publicNoteTextArea= page.locator('#order_public_order_note')
        this.outdoorOption= page.locator('[id*="outdoor_option"]')
        this.updateOrderDetailsButton= page.locator("//*[text()='Update Order Details']/../../descendant::input[@type='submit']")
        this.orderDetailsUpdatesuccessMeasage= page.locator("//*[text()='Update Successful']")
        this.editOrderDate= page.locator('a[data-modal-toggle*="date"]')
        this.updateOrderDateButton= page.locator("//*[text()='Update Order Date']/../../descendant::input[@type='submit']")
        this.orderDateUpdateSuccessMessage= page.locator("//*[contains(text(),'Order date have been updated sucessfully')]")
        this.editProductDeatils= page.locator('a[data-modal-toggle*="products"]')
        this.addNewProduct= page.locator('[id*="addNew"]')
        this.addButton= page.locator('[class*="order_Add"]')
        this.updateProductDetailsButton= page.locator("//*[text()='Update Order Products']/../../descendant::input[@type='submit']")
        this.productDetailsUpdateSuccessMessage= page.locator("//*[contains(text(),'Products have been updated successfully')]")
        this.editPaymentMode= page.locator('[id="order-payment-type"] a')
        this.savePaymentType= page.locator('[value="Save Payment Type"]')
        this.paymentUpdateSuccessMessage= page.locator("//*[text()='Payment type updated successfully']")
        this.orderId= page.locator("//p[text()='Order ID']/following-sibling::p")
        this.sendInvoiceButton= page.locator('[name="send_invoice"]')
        this.invoiceSentSuccessMessage= page.locator("//*[contains(text(),'invoice has been sent.')]")

        // Billing:
        this.billingInvoice= page.locator('[href="/contractors/invoices"]')
        this.paymentLink= page.locator('[href="/contractors/payments"]')
        this.StartDateInputField= page.locator('input[placeholder="Start Date"]')
        this.EndDateInputField= page.locator('input[placeholder="End Date"]')
        this.invoiceSearchField= page.locator('input[placeholder="Search"]')
        this.SearchButton= page.locator("//button[text()='Search']")
        this.sendInvoiceSuccessMessage= page.locator("//*[contains(text(),'Invoice has been send sucessfully')]")

        // Reports:
        this.reportsLink= page.locator('[href="/contractors/reports/customers"]')
        this.customerReport= page.locator("//a[text()='Customers Report']")
        this.reportDuration= page.locator('[id="report_duration"]')
        this.generateReport= page.locator('[value="Generate Report"]')
        this.productReport= page.locator("//a[text()='Products Report']")
        this.productReportDropdown= page.locator('[id="report_product_category_id"]')
        this.productReportOptions= page.locator('#report_product_category_id option')
        this.showOrderHistory= page.locator("//a[text()='Show Order History']")
        this.orderReport= page.locator("//a[text()='Orders Report']")
        this.orderReportStartDate= page.locator('[id="search_start_date"]')
        this.orderReportEndDate= page.locator('[id="search_end_date"]')

        //Batch print:
        this.batchPrintLink= page.locator('[href="/contractors/batch_processes"]')
        this.batchProcessDropdown= page.locator('select[id="batch"]')

        //uncancel:
        this.uncancelSuccessMessage= page.locator("//*[contains(text(),'Order has been uncancelled')]")

        // Quotes/Manual order:
        this.quoteManualOrder= page.locator('[href="/contractors/quotes"]')
        this.addNewQuotesManualOrder= page.locator('[href="/contractors/quotes/new"]')
        this.customerDropdown= page.locator('[aria-labelledby*="quote_customer_id-container"]')
        this.customerDropdownInputField= page.locator('[type="search"]')
        this.startManualOrderDate= page.locator('[aria-controls*="start_date_dateview"]')
        this.endManualOrderDate= page.locator('[aria-controls*="end_date_dateview"]')
        this.startManualOrderTime= page.locator('input#quote_start_time')
        this.endManualOrderTime= page.locator('input#quote_end_time')
        this.productDropdown= page.locator('[aria-labelledby*="product_id-container"]')
        this.productDropDownInputField= page.locator('[type="search"]')
        this.sendCheckoutLink= page.locator('[id="quote_entry_method_quote"]')
        this.createManualOrderRadioButton= page.locator('#quote_entry_method_manual_order')
        this.venomRadioButton= page.locator('#order_payment_method_other_venmo')
        this.manualOrderSuccessMessage= page.locator("//*[contains(text(),'Manual Order was successfully created')]")
        this.editOrderLink= page.locator('[href*="change_order"]')
        this.cancelOrderLink= page.locator('[title="Cancel"]')
        this.cancelOrderButton= page.locator('[value="Cancel Order"]')
        

        // Quotes order:
        this.newCustomerButton= page.locator('[href*="customers/new"]')

    }


    async clickOnTheWebsiteLink() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.websitePageLink.click()
        ]);

        
       await newPage.waitForLoadState('domcontentloaded', { timeout: 50000 });
        this.page = newPage;
        this.initLocators(newPage);

        return newPage;
    }

  async dismissPopup() {

    try {
  await this.popup.waitFor({ state: 'visible', timeout: 15000 });
  await this.popup.click();
  console.log("popup dismissed.");
} catch (e) {
  console.log("No popup appeared, skipping dismiss.");
}
    
}

    async selectTheProduct() {
        await this.productLink.waitFor({ state: 'visible', timeout: 10000 });
        await this.productLink.click();
        await this.wetBounceHouseCategories.first().click();
        await this.firstProduct.first().click();
    }

    async selectDate()
    {
      
  const fmt = d => `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`; 
  const today = new Date();
  const start = new Date(today); start.setDate(today.getDate() + 1);    
  const end   = new Date(today); end.setDate(today.getDate() + 2);       

  
  await this.startDate.click();
  await this.page.waitForTimeout(3000)
  await this.page
    .locator('#start_date_dateview:visible a.k-link[data-value="' + fmt(start) + '"]')
    .click();

  await this.page.waitForTimeout(2000)
  await this.endDate.click();
  await this.page.waitForTimeout(3000)
  await this.page
    .locator('#end_date_dateview:visible a.k-link[data-value="' + fmt(end) + '"]')
    .click();

  await this.bookNowButton.click();

  await this.page.waitForTimeout(5000)
 }
  
  async fillBillingDetails({
    firstName,
    lastName,
    email,
    address,
    city,
    state,
    zip,
    phone,
    couponcode="welcome10"
  }) {
    await this.addCartButton.click()
    await this.procedCheckoutButton.click();
    await this.orderFirstName.fill(firstName);
    await this.orderLastName.fill(lastName);
    await this.customerEmail.fill(email);
    await this.orderAddress.fill(''); // clear first
    await this.orderAddress.type(address, { delay: 100 }); // type slowly to trigger suggestions

    await this.page.waitForTimeout(1000);

    await this.page.keyboard.press('ArrowDown');
    await this.address.click()
    await this.orderCity.fill(city);

    await this.stateSelect.selectOption({ label: state }).catch(async () => {
    await this.stateSelect.selectOption({ value: state });
    });

    if (zip)   await this.zipCode.fill(zip);
    if (phone) await this.phoneNumber.fill(phone);

    if (await this.firstTipRadioButton.isVisible()) await this.firstTipRadioButton.click();
    if (await this.couponCodeField.isVisible()) await this.couponCodeField.fill(couponcode)
    if(await this.applyButton.isVisible()) await this.applyButton.click()  
    

    await this.sameBillingAddress.click()
    await this.damageCheckbox.click()
    await this.agreeCheckOut.click()

    await this.placeOrder.click()
    await this.orderSuccessfullyPlaced.waitFor({ state: 'visible', timeout: 10000})
    await this.page.waitForTimeout(2000)

      // --- SAFE TAB CLOSE LOGIC ---
  try {
    const context = this.page.context();
    const currentURL = this.page.url();
    await this.page.waitForTimeout(1000);

    // Close current tab
    await this.page.close({ runBeforeUnload: true });

    // Find main page (usually the BRS tab)
    const mainTab = context
      .pages()
      .find(
        (p) =>
          p.url().includes("bouncerentalsolutions.com") ||
          p.url().includes("contractors")
      );

    if (!mainTab)
      throw new Error("❌ Main BRS page not found after checkout tab closed.");

    console.log("🔁 Switched back to main BRS page.");
this.page = mainTab;              // ✅ rebind OrdersPage to active page
this.initLocators(mainTab);       // ✅ refresh all locators
return mainTab;
  } catch (err) {
    console.error("⚠️ Error closing checkout tab:", err);
    throw err;
  }
  }

   async fillBillinDetailsAlongWithCardDetails(
    firstName,
    lastName,
    email,
    address,
    city,
    state,
    zip,
    phone,
    couponcode="welcome10",
    cardnumber,
    expdate,
    cvc,
    zipnumber
  ) {
    await this.addCartButton.click()
    await this.procedCheckoutButton.click();
    await this.orderFirstName.fill(firstName);
    await this.orderLastName.fill(lastName);
    await this.customerEmail.fill(email);
    await this.orderAddress.fill(''); // clear first
    await this.orderAddress.type(address, { delay: 100 }); // type slowly to trigger suggestions

    await this.page.waitForTimeout(1000);

    await this.page.keyboard.press('ArrowDown');
    await this.address.click()
    await this.orderCity.fill(city);

    await this.stateSelect.selectOption({ label: state }).catch(async () => {
    await this.stateSelect.selectOption({ value: state });
    });

    if (zip)   await this.zipCode.fill(zip);
    if (phone) await this.phoneNumber.fill(phone);

    if (await this.firstTipRadioButton.isVisible()) await this.firstTipRadioButton.click();
    if (await this.couponCodeField.isVisible()) await this.couponCodeField.fill(couponcode)
    if(await this.applyButton.isVisible()) await this.applyButton.click()  
    

    await this.sameBillingAddress.click()
    await this.page.waitForTimeout(2000)
    await this.creaditCardRadioButton.click()
    await this.page.waitForTimeout(3000)
    await this.cardNumberInputField.fill(cardnumber)
    await this.page.waitForTimeout(2000)
    await this.expdateInputField.fill(expdate)
    await this.page.waitForTimeout(2000)
    await this.cvcInputField.fill(cvc)
    await this.page.waitForTimeout(2000)
    await this.zipInputField.fill(zipnumber)
    await this.page.waitForTimeout(2000)

    await this.damageCheckbox.click()
    await this.agreeCheckOut.click()

  
    await this.placeOrder.click()
    await this.orderSuccessfullyPlaced.waitFor({ state: 'visible', timeout: 10000})
    await this.page.waitForTimeout(2000)

      // --- SAFE TAB CLOSE LOGIC ---
  try {
    const context = this.page.context();
    const currentURL = this.page.url();
    await this.page.waitForTimeout(1000);

    // Close current tab
    await this.page.close({ runBeforeUnload: true });

    // Find main page (usually the BRS tab)
    const mainTab = context
      .pages()
      .find(
        (p) =>
          p.url().includes("bouncerentalsolutions.com") ||
          p.url().includes("contractors")
      );

    if (!mainTab)
      throw new Error("❌ Main BRS page not found after checkout tab closed.");

    console.log("🔁 Switched back to main BRS page.");
this.page = mainTab;              // ✅ rebind OrdersPage to active page
this.initLocators(mainTab);       // ✅ refresh all locators
return mainTab;
  } catch (err) {
    console.error("⚠️ Error closing checkout tab:", err);
    throw err;
  }
  }

  async navigateAllOrder()
  {
    await this.ordersLink.waitFor({ state: 'visible', timeout: 10000})
    await this.ordersLink.click()
    await this.allOrders.first().waitFor({ state: 'visible', timeout: 10000})
    await this.allOrders.first().click()
    await this.page.waitForTimeout(3000)
  }

  async editTheOrder(email)
  {
    await this.page.waitForTimeout(3000)
    // Locate the row that contains the email
const row = this.page.locator(`//tr[.//td[normalize-space()="${email}"]]`).first();
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

}

async reviewOrder()
{
  await this.page.waitForTimeout(3000)
  await this.review.click()
  await this.updateOrderMessage.waitFor({ state: 'visible', timeout: 10000 })
  await this.page.waitForTimeout(2000)

}  

async proceedPayment()
{
  await this.processPayment.click()
  await this.page.waitForTimeout(3000)
}

async cancelCreatedOrder()
{
  await this.cancelOrder.click()
  await this.cancelAnOrder.click()
  await this.orderCancelSuccessMessage.waitFor({ state: 'visible', timeout: 10000 })
  await this.page.waitForTimeout(2000)

}

// Edited the created order:

async editAddress(phoneNumber)
{
  await this.page.waitForTimeout(5000)
  await this.editAddressLink.click()
  await this.page.waitForTimeout(2000)
  await this.contactNumberField.fill(phoneNumber)
  await this.updateAddressButton.click()
  await this.addressUpdateSuccessMessage.waitFor({ state: 'visible', timeout: 10000 })
}

async editDetails(publicNote)
{
  await this.page.waitForTimeout(3000)
  await this.editOrderDetails.click()
  await this.page.waitForTimeout(2000)
  await this.publicNoteTextArea.fill(publicNote)
  await this.updateOrderDetailsButton.click()
  await this.orderDetailsUpdatesuccessMeasage.waitFor({ state: 'visible', timeout: 10000 })
}


async editDate()
{
  await this.page.waitForTimeout(3000)
  await this.editOrderDate.click()
  await this.page.waitForTimeout(2000)
  const fmt = d => `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`; 
  const today = new Date();
  const start = new Date(today); start.setDate(today.getDate() + 3);    
  const end   = new Date(today); end.setDate(today.getDate() + 4);       

  
  // await this.startDate.click();
  await this.page.waitForTimeout(5000)
  // await this.page
  //   .locator('#order_start_date_dateview a.k-link[data-value="' + fmt(start) + '"]')
  //   .click();

  await this.endDate.click();
  await this.page.waitForTimeout(5000)
  await this.page
    .locator('#order_end_date_dateview a.k-link[data-value="' + fmt(end) + '"]')
    .click();

  await this.updateOrderDateButton.click()
  await this.orderDateUpdateSuccessMessage.waitFor({ state: 'visible', timeout: 10000 })



}

async editProduct()
{
  await this.page.waitForTimeout(3000)
  await this.editProductDeatils.click()
  await this.page.waitForTimeout(2000)
  await this.addNewProduct.click()
  await this.addButton.click()
  await this.page.waitForTimeout(2000)
  await this.updateProductDetailsButton.click()
  await this.productDetailsUpdateSuccessMessage.waitFor({ state: 'visible', timeout: 10000 })

}

async editPayment(paymentType)
{
  await this.page.waitForTimeout(3000)
  await this.editPaymentMode.click()
  await this.page.waitForTimeout(2000)
  await this.page.locator("//span[text()='"+paymentType+"']/preceding-sibling::input").click()
  await this.savePaymentType.click()
  await this.paymentUpdateSuccessMessage.waitFor({ state: 'visible', timeout: 10000 })

}

// send invoice:

async getOrderId()
{
    const orderIdText = await this.orderId.first().textContent();
    this.orderIdValue = orderIdText.trim(); // store in class-level variable
    console.log('Order ID:', this.orderIdValue);
    return this.orderIdValue;
}

async sendInvoice()
{
  const orderID=await this.getOrderId()
  await this.sendInvoiceButton.click()
  await this.invoiceSentSuccessMessage.waitFor({ state: 'visible', timeout: 10000 })
  await this.billingInvoice.click()
  await this.page.waitForTimeout(3000)

  // const fmt = d => `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`;
  const fmt = d => `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`; 
  const today = new Date();
  const start = new Date(today); start.setDate(today.getDate());    
  const end   = new Date(today); end.setDate(today.getDate() + 4);       

  await this.StartDateInputField.fill(fmt(start))
  await this.EndDateInputField.fill(fmt(end))
  await this.SearchButton.click()
  await this.page.waitForTimeout(3000)

  // Locate the row that contain order ID
const row = this.page.locator(`//tr[.//td[normalize-space()="${orderID}"]]`);
await row.scrollIntoViewIfNeeded(); // ensure the row is vertically visible

// Locate the send invoice button inside that row
const sendInvoiceBtn = row.locator('a[title="Send Invoice"], button[title="Send Invoice"]');

// --- Make sure the send invoice icon is visible horizontally ---
await sendInvoiceBtn.evaluate((el) => {
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
await sendInvoiceBtn.waitFor({ state: 'visible', timeout: 5000 });

// ✅ Click the sendInvoice button
await sendInvoiceBtn.click();

await this.sendInvoiceSuccessMessage.waitFor({ state: 'visible', timeout: 10000 })
}

// Procees payment:

async successPayment()
{
  const orderID=await this.getOrderId()
  await this.page.waitForTimeout(2000)
  await this.proceedPayment()
  await this.page.waitForTimeout(2000)
  await this.billingInvoice.click()
  await this.paymentLink.click()
  await this.page.waitForTimeout(3000)

  // Locate the row that contain order ID
const row = this.page.locator(`//tr[.//td[normalize-space()="${orderID}"]]`).first()
await row.waitFor({ state: 'visible', timeout: 10000 });

}

 async clickOnAllOrder()
 {
  await this.page.waitForTimeout(2000)
  await this.allOrders.click()
  await this.page.waitForTimeout(2000)
 }

 async clickOnReports()
 {
   await this.page.waitForTimeout(2000)
   await this.reportsLink.click()
   await this.page.waitForTimeout(2000)

 }

 async verifyCustomerReportsForAllDurations(email) {

  await this.page.waitForTimeout(2000)
  await this.customerReport.click()
  // Wait for dropdown to be visible
  await this.reportDuration.waitFor({ state: 'visible', timeout: 10000 });

  // Get all option elements inside the dropdown
  const options = await this.reportDuration.locator('option').all();

  for (let i = 0; i < options.length; i++) {
    const value = await options[i].getAttribute('value');
    const label = (await options[i].innerText()).trim();

    // Skip the "Today" option
    if (label.toLowerCase() === 'today') {
      console.log(`⏩ Skipping option: ${label}`);
      continue;
    }

    console.log(`Selecting: ${label}`);

    // Select each duration
    await this.reportDuration.selectOption(value);

    // Click on "Generate Report" button
    await this.generateReport.click();

    // Wait for page or results to load
    await this.page.waitForLoadState('networkidle');

    // Verify that the expected text appears on the page
    const isVisible = await this.page.locator(`text=${email}`).first().isVisible();

    if (isVisible) {
      console.log(`✅ "${email}" is visible for ${label}`);
    } else {
      console.log(`❌ "${email}" not found for ${label}`);
    }

    // Optional small wait before next iteration
    await this.page.waitForTimeout(1000);
  }
}

 async verifyProductReport(optionText)
 {
   await this.productReport.click();

  // Wait for dropdown to appear
  await this.productReportDropdown.waitFor({ state: 'visible', timeout: 10000 });

  // Select option directly by visible text
  await this.page.selectOption('#report_product_category_id', { label: optionText });
  await this.generateReport.click()
  await this.showOrderHistory.first().waitFor({ state: 'visible', timeout: 10000 })

 }
 async verifyOrderReport(email)
 {
  await this.orderReport.click()
  await this.page.waitForTimeout(2000)
   // const fmt = d => `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`;
  const fmt = d => `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`; 
  const today = new Date();
  const start = new Date(today); start.setDate(today.getDate());    
  const end   = new Date(today); end.setDate(today.getDate() + 4); 

  await this.orderReportStartDate.fill(fmt(start))
  await this.page.waitForTimeout(1000);
  await this.page.keyboard.press('Escape');
  await this.orderReportEndDate.fill(fmt(end))
  await this.page.keyboard.press('Escape');
  await this.page.waitForTimeout(1000);
  await this.generateReport.click()

     // Wait for page or results to load
  await this.page.waitForLoadState('networkidle');

    // Verify that the expected text appears on the page
  const isVisible = await this.page.locator(`text=${email}`).first().isVisible();
  
   if (isVisible) {
      console.log(`✅ "${email}" is visible`);
    } else {
      console.log(`❌ "${email}" not found`);
    }

    // Optional small wait before next iteration
    await this.page.waitForTimeout(1000);

 }

 async clickOnBatchPrint()
 {
  await this.page.waitForTimeout(2000)
  await this.batchPrintLink.click()
  await this.page.waitForTimeout(2000)
 }

 async verifyBatchPrint(email)
 {
    await this.batchProcessDropdown.waitFor({ state: 'visible', timeout: 10000 });

      const fmt = d => `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`; 
  const today = new Date();
  const start = new Date(today); start.setDate(today.getDate());    
  const end   = new Date(today); end.setDate(today.getDate() + 4);       

  await this.StartDateInputField.fill(fmt(start))
  await this.EndDateInputField.fill(fmt(end))
  await this.SearchButton.click()
  await this.page.waitForTimeout(3000)

  // Get all option elements inside the dropdown
  const options = await this.batchProcessDropdown.locator('option').all();

  for (let i = 0; i < options.length; i++) {
    const value = await options[i].getAttribute('value');
    const label = (await options[i].innerText()).trim();

    console.log(`Selecting: ${label}`);

    // Select each duration
    await this.batchProcessDropdown.selectOption(value);

   
   // Wait for page or results to load
    await this.page.waitForLoadState('networkidle');

    // Verify that the expected text appears on the page
    const isVisible = await this.page.locator(`text=${email}`).first().isVisible();

    if (isVisible) {
      console.log(`✅ "${email}" is visible for ${label}`);
    } else {
      console.log(`❌ "${email}" not found for ${label}`);
    }

    // Optional small wait before next iteration
    await this.page.waitForTimeout(1000);
  }
 }

 async uncancelTheOrder(email)
 {
     // Locate the row that contains the email
const row = this.page.locator(`//tr[.//td[normalize-space()="${email}"]]`).first();
await row.scrollIntoViewIfNeeded(); // ensure the row is vertically visible

// Locate the uncancel button inside that row
const uncancelBtn = row.locator('a[title="Un-Cancel"], button[title="Un-Cancel"]').first();

// --- Make sure the uncancel icon is visible horizontally ---
await uncancelBtn.evaluate((el) => {
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
await uncancelBtn.waitFor({ state: 'visible', timeout: 5000 });

// ✅ Click the uncancel button
await uncancelBtn.click();

await this.page.waitForLoadState('domcontentloaded');

await this.uncancelSuccessMessage.waitFor({ state: 'visible', timeout: 10000 })

 }

 async cancelTheCompleteOrder(email)
 {
   // Row that contains the email
  const row = this.page.locator(`//tr[.//td[normalize-space()="${email}"]]`).first();
  await row.scrollIntoViewIfNeeded(); // vertical into view

  // Delete button inside that row
  const cancelBtn = row.locator('a[title="Cancel"], button[title="Cancel"]').first();

  // --- Make sure the delete icon is visible horizontally ---
  await cancelBtn.evaluate((el) => {
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
  await cancelBtn.waitFor({ state: 'visible', timeout: 5000 });

  // ✅ Click the Edit button
  await cancelBtn.click();

  await this.page.waitForLoadState('domcontentloaded');

  await this.cancelAnOrder.click()

  await this.orderCancelSuccessMessage.waitFor({ state: 'visible', timeout: 10000 })



 }
  //Route Planner Method:-

  async navigateRoutePlannerPage()
  {
    await this.ordersLink.click()
    await this.rentalPlannerLink.click()
    await this.page.waitForTimeout(2000);
  }


  async addTruckDetails(startLocation, endLocation)
  {
    await this.addTruckButton.click()
    const count = await this.enterFieldsLocation.count();

    await this.enterFieldsLocation.nth(count - 2).fill(startLocation);

    await this.enterFieldsLocation.nth(count - 1).fill(endLocation);

    await this.saveRouteButton.click()

    await this.successUpdateMessage.waitFor({ state: 'visible', timeout: 10000 });


  }

  async deleteTheTruck()
  {
    await this.removeTruckIcon.last().click()

    await this.rentalChangeMessage.waitFor({ state: 'visible', timeout: 10000 })

    await this.saveRouteButton.click()

    await this.successUpdateMessage.waitFor({ state: 'visible', timeout: 10000 })
  }

  // Customer method:-
  async navigateCustomerPage()
  {
    await this.ordersLink.click()
    await this.customerLink.last().click()
    await this.page.waitForTimeout(2000);
  }

  async clickAddNewCustomer()
  {
    await this.page.waitForTimeout(2000)
    await this.newCustomerLink.click()
    await this.page.waitForTimeout(2000)
  }

  async addNewCustomer(firstName, lastName, address, city, state, zip, phone)
  {
    
    const timestamp = Date.now(); 
    const email = `addcustomer_${timestamp}@gmail.com`;
    await this.customerEmail.fill(email);
    await this.CustomerPhone.fill(phone);
    await this.customerFirstName.fill(firstName);
    await this.customerLastName.fill(lastName);
    await this.customerAddress.fill(address);
    await this.customerCity.fill(city);
    await this.customerState.fill(state);
    await this.customerZipCode.fill(zip);
    await this.submitButton.click();
    await this.customerCreatedSuccessfully.waitFor({ state: 'visible', timeout: 10000 })
    await this.page.waitForTimeout(2000)
    return email;
  }

  async verifyCustomerReport(email)
  {
    await this.reportsLink.click()
    await this.customerReport.click()

    await this.reportDuration.waitFor({ state: 'visible', timeout: 10000 });

  // Get all option elements inside the dropdown
  const options = await this.reportDuration.locator('option').all();

  for (let i = 0; i < options.length; i++) {
    const value = await options[i].getAttribute('value');
    const label = (await options[i].innerText()).trim();

    console.log(`Selecting: ${label}`);

    // Select each duration
    await this.reportDuration.selectOption(value);

    // Click on "Generate Report" button
    await this.generateReport.click();

    // Wait for page or results to load
    await this.page.waitForLoadState('networkidle');

    // Verify that the expected text appears on the page
    const isVisible = await this.page.locator(`text=${email}`).first().isVisible();

    if (isVisible) {
      console.log(`✅ "${email}" is visible for ${label}`);
    } else {
      console.log(`❌ "${email}" not found for ${label}`);
    }

    // Optional small wait before next iteration
    await this.page.waitForTimeout(1000);
  }

  }
  async updateTheCustomerDetails(email, updateNumber) 
  {
    await this.customerLink.click()
    await this.page.waitForTimeout(2000)
    await this.page.locator("//*[text()='" + email + "']/../descendant::a[@title='Edit']").click();
    await this.page.waitForTimeout(3000)
    await this.CustomerPhone.fill(updateNumber);
    await this.submitButton.click();
    await this.customerEditedSuccessfully.waitFor({ state: 'visible', timeout: 10000 });
    await this.page.waitForTimeout(3000)
  }

  async deleteTheCustomer(email)
  { 
   this.page.once('dialog', async dialog => {
   console.log(`Dialog message: ${dialog.message()}`);
   await dialog.accept();
});

  await this.page.locator("//*[text()='" + email + "']/../descendant::a[@title='Delete']").click()
  await this.customerDeletedSuccessfully.waitFor({ state: 'visible', timeout: 10000 })
  await this.page.waitForTimeout(3000)

  }

  async navigateManualOrderPage()
  {
    await this.ordersLink.click()
    await this.quoteManualOrder.click()
    await this.page.waitForTimeout(2000);
  }

  async completeManualOrder(email, productName, startTime, endTime)
  {
    await this.quoteManualOrder.click()
    await this.page.waitForTimeout(2000);
    await this.addNewQuotesManualOrder.click()
    await this.page.waitForTimeout(2000)
    await this.customerDropdown.click()
    await this.customerDropdownInputField.fill(email)
    await this.page.waitForTimeout(5000)
    await this.page.keyboard.press('Enter');

    const fmt = d => `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}`; 
    const today = new Date();
    const start = new Date(today); start.setDate(today.getDate() + 1);    
    const end   = new Date(today); end.setDate(today.getDate() + 2);       

  
  await this.startManualOrderDate.click();
  await this.page.waitForTimeout(3000)
  await this.page
    .locator('a.k-link[data-value="' + fmt(start) + '"]').first()
    .click();

  await this.endManualOrderDate.click();
  await this.page.waitForTimeout(3000)
  await this.page
    .locator('a.k-link[data-value="' + fmt(end) + '"]').last()
    .click();

    await this.startManualOrderTime.fill(startTime)
    await this.endManualOrderTime.fill(endTime)
    await this.productDropdown.click()
    await this.productDropDownInputField.fill(productName)
    await this.page.waitForTimeout(5000)
    await this.page.keyboard.press('Enter');
    await this.createManualOrderRadioButton.click()
    await this.page.waitForTimeout(3000)
    await this.venomRadioButton.click()
    await this.submitButton.click()
    await this.manualOrderSuccessMessage.waitFor({ state: 'visible', timeout: 20000 })
    await this.page.waitForTimeout(3000)
  }

  async deleteTheOrder(email)
  {
  // Row that contains the email
  const row = this.page.locator(`//tr[.//td[normalize-space()="${email}"]]`).first();
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
  await this.deleteOrderSuccessMessage.waitFor({ state: 'visible', timeout: 10000 })

  }

  async clickOnNewCustomer()
  {
    await this.addNewQuotesManualOrder.click()
    await this.page.locator(2000)

     const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.newCustomerButton.click()
        ]);

        
        await newPage.waitForLoadState('domcontentloaded');
        this.page = newPage;
        this.initLocators(newPage);

        return newPage;

  }

  async clickOnCustomerLink()
  {
    await this.page.waitForTimeout(2000)
    await this.customerLink.click()
    await this.page.waitForTimeout(2000)
  }
  
}

