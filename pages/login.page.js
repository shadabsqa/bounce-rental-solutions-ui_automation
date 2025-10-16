import config from '../configs/config.js';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginLink=page.locator("(//a[@href='/contractors/sign_in'])[2]")
    this.emailInput = page.locator('[placeholder="Email*"]');
    this.passwordInput = page.locator('[type*="password"]');
    this.loginButton = page.locator("[class*='flex items-center justify']+button");
    this.dashboardElement = page.locator('[title="My Website"]');
    this.accountButton= page.locator("[class='relative']")
    this.logoutButton= page.locator('[href="/contractors/sign_out"]')
    this.warningDismiss= page.locator('[href*="dismiss_warning"]')
    this.closePopupIcon= page.locator('button.ml-popup-close[aria-label="Close"]')
    this.popupContainer = page.locator('div#Popup');
    this.closeButton = page.locator('button.ml-popup-close');

    //Create new account locators:-
    this.createNewAccountLink= page.locator("//a[text()='Create an Account']")
    this.firstNameInputField= page.locator('input[placeholder*="First Name"]')
    this.lastNaeInputField= page.locator('input[placeholder*="Last Name"]')
    this.emailInputField= page.locator('input[type="email"]')
    this.companyInputField= page.locator('input[placeholder*="Company Name"]')
    this.contactInputField= page.locator('input[placeholder*="Contact Number"]')
    this.passwordInputField= page.locator('input#contractor_password')
    this.confirmPasswordInputField= page.locator('input#contractor_password_confirmation')
    this.checkbox= page.locator('#contractor_terms_of_service')

    //Forget password:-
    this.forgetPasswordLink=page.locator('a[data-modal-show*="forgot"]')
    this.enterEmailInputField= page.locator('[placeholder*="Enter Email"]')

  }

  async navigate() {
    await this.page.goto(config.baseUrl);
  }

  async clickOnLogin()
  {
    await this.loginLink.click();
  }
  async enterUsername(username) {
    await this.emailInput.fill(username);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
    await this.page.waitForTimeout(5000);
  }

   async getDashboardElement() {
    await this.dashboardElement.waitFor({ timeout: 30000 });
    await this.dashboardElement.isVisible();
  }

  async logoutFromApplication()
  {
    await this.accountButton.click()
    await this.logoutButton.click()
  }

  async getLoginPage()
  {
    await this.loginLink.waitFor({ timeout: 30000 });
    await this.loginLink.isVisible()
  }

  async dismiss() {

    try {
  await this.warningDismiss.waitFor({ state: 'visible', timeout: 20000 });
  await this.warningDismiss.click();
  console.log("Warning dismissed.");
} catch (e) {
  console.log("No warning appeared, skipping dismiss.");
}
    
}

async closePopup() {
  try {
    console.log("Waiting for popup iframe to appear...");

    // Wait for the iframe to appear in DOM
    const popupFrameLocator = this.page.frameLocator('[allow*="clipboard"]');
    await this.page.waitForSelector('[allow*="clipboard"]', { state: 'attached', timeout: 30000 });

    console.log("Popup iframe found. Waiting for popup content...");
    
    // Wait for the popup container inside the iframe
    const popupContainer = popupFrameLocator.locator('#Popup');
    await popupContainer.waitFor({ state: 'visible', timeout: 30000 });

    console.log("Popup container visible. Looking for close/cancel button...");

    // Locate and click the cancel/close button
    const closeButton = popupFrameLocator.locator('#Popup button[type="button"]');
    await closeButton.waitFor({ state: 'visible', timeout: 10000 });
    await closeButton.click();

    console.log("Popup closed successfully.");

  } catch (error) {
    console.log("No popup appeared or failed to close:", error.message);
  }
}



// Create new account:-
async clickOnCreateNewAccount()
{
  await this.page.waitForTimeout(2000)
  await this.createNewAccountLink.click()
  await this.page.waitForTimeout(2000)
}

async createNewAccount(firstName, lastName, emaildomain, companyName, contactNumber, password, confirmPassword) {
  await this.page.waitForTimeout(3000);
  await this.firstNameInputField.fill(firstName);
  await this.lastNaeInputField.fill(lastName);

  const timestamp = Date.now();
  const emailPrefix = `TestUser_${timestamp}`;
  this.generatedEmail = `${emailPrefix}@${emaildomain}`;

  await this.emailInputField.first().fill(this.generatedEmail);
  await this.companyInputField.fill(companyName);
  await this.contactInputField.fill(contactNumber);
  await this.passwordInputField.first().fill(password);
  await this.confirmPasswordInputField.fill(confirmPassword);
  await this.checkbox.click();

  console.log(`✅ Account details filled for ${this.generatedEmail}`);

  // Return email prefix for next function
  return emailPrefix;
}


async navigateGetnadaApplication(username) {
  try {
    console.log("Opening Inboxes.com in a new tab...");
    const context = this.page.context();

    // STEP 1: open new tab
    const inboxPage = await context.newPage();
    await inboxPage.goto('https://inboxes.com', { waitUntil: 'domcontentloaded' });
    await inboxPage.waitForTimeout(2000);

    // STEP 2: click "Add Inbox"
    const addInboxButton = inboxPage.locator("//button[contains(text(),'Get my first inbox')]");
    await addInboxButton.first().waitFor({ state: 'visible', timeout: 12000 });
    await addInboxButton.first().click();
    console.log("Clicked Add Inbox main button");

    // STEP 3: fill username
    const usernameInput = inboxPage.locator('input[placeholder="Enter username"]');
    await usernameInput.waitFor({ state: 'visible', timeout: 10000 });
    await usernameInput.fill(username);
    console.log(`Entered username: ${username}`);

    // STEP 4: select domain
    const dropdown = inboxPage.locator("[class*='block w-full text']");
    await dropdown.waitFor({ state: 'visible', timeout: 10000 });
    await dropdown.selectOption({ label: 'getnada.com' });
    console.log("Selected domain: getnada.com");

    // STEP 5: confirm Add Inbox
    const confirmAddInboxButton = inboxPage.locator("(//button[text()='Add Inbox'])[1]");
    await confirmAddInboxButton.waitFor({ state: 'visible', timeout: 10000 });
    await confirmAddInboxButton.click();
    console.log("Inbox created successfully");

   

    // STEP 7: SWITCH BACK to previous tab
    console.log("Switching back to main app tab to create account...");
    const pages = context.pages();
    const mainAppPage = pages[0]; // your main tab (assuming first tab is the app)
    await mainAppPage.bringToFront();

    // STEP 8: click 'Create Account' on main tab
    const createAccountBtn = mainAppPage.locator('[title="Proceed to sign up"]');
    await createAccountBtn.waitFor({ state: 'visible', timeout: 10000 });
    await createAccountBtn.click();
    console.log("Clicked Create Account button on main tab");

    const successmessage=await mainAppPage.locator("//div[contains(text(),'A message with a confirmation link has been sent to your email address')]").first()
    await successmessage.waitFor({ state: 'visible', timeout: 10000 });
    // STEP 9: Switch again to GetNada tab
    console.log("Switching back to GetNada inbox tab...");
    await inboxPage.bringToFront();

    console.log("Back to GetNada inbox page — ready to wait for verification email.");

    return inboxPage; // Return for further actions like checking mail

  } catch (error) {
    console.error("Fatal error in navigateGetnadaApplication():", error.message);
    throw error;
  }
}

async verifyEmailAndLogin(username, password) {
  try {
    const context = this.page.context();
    const pages = context.pages();

    // Step 1: Get reference to inbox tab
    const inboxPage = pages.find(p => p.url().includes('inboxes.com'));
    if (!inboxPage) throw new Error('Inbox tab not found!');
    await inboxPage.bringToFront();

    console.log("Waiting for verification email...");

    // Step 2: Wait for the verification mail to arrive
    const mailSubject = inboxPage.locator("//td[text()='Please confirm your request for BRS account']");
    await mailSubject.waitFor({ state: 'visible', timeout: 60000 });
    await mailSubject.click();
    console.log("Opened verification email.");

    // Step 3: Click on the confirmation link inside email
    const confirmLink = inboxPage.locator('a[href*="https://app.bouncerentalsolutions.com/contractors/confirmation"]');
    await confirmLink.waitFor({ state: 'visible', timeout: 10000 });

    // Use 'waitForEvent' to capture new tab opened by the link
    const [confirmationPage] = await Promise.all([
      context.waitForEvent('page'),
      confirmLink.click(),
    ]);
    await confirmationPage.waitForLoadState('domcontentloaded');
    console.log("Opened confirmation page in a new tab.");

    // Step 4: Perform login on the new confirmation page
    const emailField = confirmationPage.locator('[placeholder="Email*"]');
    const passwordField = confirmationPage.locator('[type="password"]');
    const loginButton = confirmationPage.locator("[class*='flex items-center justify']+button");

    await emailField.waitFor({ state: 'visible', timeout: 15000 });
    await emailField.fill(`${username}@getnada.com`);
    await passwordField.fill(password);
    await loginButton.click();
    console.log("🔐 Logged into BRS successfully.");

    // Step 5: Validate successful login (dashboard element)
    const dashboard = confirmationPage.locator('[title="My Website"]');
    await dashboard.waitFor({ state: 'visible', timeout: 20000 });
    console.log("Login successful, dashboard loaded.");

      await confirmationPage.close();
    console.log("🗙 Closed confirmation page.");

    await inboxPage.close();
    console.log("🗙 Closed inbox page.");

    // Step 7: Switch back to original main app page (first tab)
    const mainAppPage = context.pages()[0];
    await mainAppPage.bringToFront();
    console.log("↩️ Returned to original main page successfully.");

  } catch (error) {
    console.error("Fatal Error in verifyEmailAndLogin():", error.message);
    throw error;
  }
}

async clickOnForgetPasswordLink()
{
  await this.page.waitForTimeout(2000)
  await this.forgetPasswordLink.click()
  await this.page.waitForTimeout(2000)
}

async enterTheEmailAddress(username)
{
  await this.page.waitForTimeout(2000)
  await this.enterEmailInputField.fill(`${username}@getnada.com`)
  await this.page.waitForTimeout(2000)
}


async navigateGetnadaApplicationToResetPassword(username) {
  try {
    console.log("Opening Inboxes.com in a new tab...");
    const context = this.page.context();

    // STEP 1: open new tab
    const inboxPage = await context.newPage();
    await inboxPage.goto('https://inboxes.com', { waitUntil: 'domcontentloaded' });
    await inboxPage.waitForTimeout(2000);

    // STEP 2: click "Add Inbox"
    const addInboxButton = inboxPage.locator("//button[contains(normalize-space(.), 'Get my first inbox') or normalize-space(.)='Add Inbox']");
    await addInboxButton.first().waitFor({ state: 'visible', timeout: 12000 });
    await addInboxButton.first().click();
    console.log("Clicked Add Inbox main button");

    // STEP 3: fill username
    const usernameInput = inboxPage.locator('input[placeholder="Enter username"]');
    await usernameInput.waitFor({ state: 'visible', timeout: 10000 });
    await usernameInput.fill(username);
    console.log(`Entered username: ${username}`);

    // STEP 4: select domain
    const dropdown = inboxPage.locator("[class*='block w-full text']");
    await dropdown.waitFor({ state: 'visible', timeout: 10000 });
    await dropdown.selectOption({ label: 'getnada.com' });
    console.log("Selected domain: getnada.com");

    // STEP 5: confirm Add Inbox
    const confirmAddInboxButton = inboxPage.locator("(//button[text()='Add Inbox'])[1]");
    await confirmAddInboxButton.waitFor({ state: 'visible', timeout: 10000 });
    await confirmAddInboxButton.click();
    console.log("Inbox created successfully");

   

    // STEP 7: SWITCH BACK to previous tab
    console.log("Switching back to main app tab to create account...");
    const pages = context.pages();
    const mainAppPage = pages[0]; // your main tab (assuming first tab is the app)
    await mainAppPage.bringToFront();

    // STEP 8: click 'Create Account' on main tab
    const createAccountBtn = mainAppPage.locator("//button[normalize-space(.)='Send Email']");
    await createAccountBtn.waitFor({ state: 'visible', timeout: 10000 });
    await createAccountBtn.click();
    console.log("Clicked Create Account button on main tab");

    const successmessage=await mainAppPage.locator("//div[contains(text(),'you’ll receive reset instructions shortly')]").first()
    await successmessage.waitFor({ state: 'visible', timeout: 10000 });
    // STEP 9: Switch again to GetNada tab
    console.log("Switching back to GetNada inbox tab...");
    await inboxPage.bringToFront();

    console.log("Back to GetNada inbox page — ready to wait for verification email.");

    return inboxPage; // Return for further actions like checking mail

  } catch (error) {
    console.error("Fatal error in navigateGetnadaApplication():", error.message);
    throw error;
  }
}

async createNewPassword(newpassword, confirmnewpassword) {
  try {
    const context = this.page.context();
    const pages = context.pages();

    // Step 1: Get reference to inbox tab
    const inboxPage = pages.find(p => p.url().includes('inboxes.com'));
    if (!inboxPage) throw new Error('Inbox tab not found!');
    await inboxPage.bringToFront();

    console.log("Waiting for verification email...");

    // Step 2: Wait for the verification mail to arrive
    const mailSubject = inboxPage.locator("//td[text()='Password Reset Request']");
    await mailSubject.waitFor({ state: 'visible', timeout: 60000 });
    await mailSubject.click();
    console.log("Opened verification email.");

    // Step 3: Click on the confirmation link inside email
    const confirmLink = inboxPage.locator('a[href*="bouncerentalsolutions.com/contractors/password/edit?reset_password"]');
    await confirmLink.waitFor({ state: 'visible', timeout: 10000 });

    // Use 'waitForEvent' to capture new tab opened by the link
    const [confirmationPage] = await Promise.all([
      context.waitForEvent('page'),
      confirmLink.click(),
    ]);
    await confirmationPage.waitForLoadState('domcontentloaded');
    console.log("Opened confirmation page in a new tab.");

    // Step 4: Perform login on the new confirmation page
    const newPasswordField = confirmationPage.locator('[placeholder="New Password"]');
    const confirmPasswordField = confirmationPage.locator('[placeholder="Confirm Password"]');
    const submitButton = confirmationPage.locator('button[type="submit"]');

    await newPasswordField.waitFor({ state: 'visible', timeout: 15000 });
    await newPasswordField.fill(newpassword);
    await confirmPasswordField.fill(confirmnewpassword);
    await submitButton.first().click();
    console.log("Logged into BRS successfully.");

    // Step 5: Validate successful login (dashboard element)
    const dashboard = confirmationPage.locator("//*[contains(text(),'Password has been updated')]");
    await dashboard.waitFor({ state: 'visible', timeout: 20000 });
    console.log("password successfully updated");

  } catch (error) {
    console.error("Fatal Error in createNewPassword():", error.message);
    throw error;
  }
}

}