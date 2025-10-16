import { setWorldConstructor, World } from "@cucumber/cucumber";
import { chromium } from "playwright";
import playwright from "playwright";
import config from "../../configs/config.js";
import fs from 'fs';
const SESSION_FILE = 'auth.json';
class BrowserType extends World {
  constructor(options) {
    super(options);
    // Initialize retry counter
     this.retryAttempt = 0;
     this.maxRetries = 1; // Max 1 retries (2 total attempts)
  }

  async init() {
    try {
      // Increment retry attempt if this is a retry
      if (this.retryAttempt > 0) {
        console.log(`🔄 Retry attempt ${this.retryAttempt}/${this.maxRetries}`);
      }

      if (config.executionMode === "lambda") {
        // LambdaTest configuration
        const capabilities = {
          browserName: "Chrome",
          browserVersion: "latest",
          "LT:Options": {
            platform: config.lambdaTest.platformName,
            build: config.lambdaTest.buildName,
            name: "BRS Test",
            user: config.lambdaTest.username,
            accessKey: config.lambdaTest.accessKey,
            network: false,
            video: true,
            console: true,
            tunnel: config.lambdaTest.tunnel,
            timeout: 30000000,
            idleTimeout: 30000000,
            sessionTimeout: 30000000,
            queueTimeout: 900

          },
        };

        this.browser = await playwright.chromium.connect({
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify(capabilities)
          )}`,
          timeout: 30000000, // 50 minutes connection timeout
        });

        this.context = await this.browser.newContext({
          viewport: { width: 1900, height: 1000 },
          timeout: 30000000, // 40 minutes context timeout
        });
      } else {
        // Local execution
        this.browser = await chromium.launch({
          headless: config.browser.headless,
          slowMo: config.browser.slowMo,
          //   args: ['--start-maximized',
          //     '--window-size=1920,1080',
          //   ]
          // });

          args: [
            '--start-maximized',
            '--window-size=1920,1080',
            '--disable-blink-features=AutomationControlled',
            '--no-sandbox',
            '--disable-dev-shm-usage',
             '--disable-features=IsolateOrigins,site-per-process' 
          ]
        });

        const contextOptions = {
          // viewport: null,
          // timeout: config.browser.timeout,

          viewport: { width: 1920, height: 1080 },
          timeout: config.browser.timeout,
          recordVideo: { dir: 'reports/videos/.raw', size: { width: 1920, height: 1080 } },
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
        };

        // Load storage state if available
        if (fs.existsSync(SESSION_FILE)) {
          contextOptions.storageState = SESSION_FILE;
          console.log("✅ Loaded session from storage.");
        }
        this.context = await this.browser.newContext(contextOptions);


        //  this.context = await this.browser.newContext({
        //    // Record video for each page; we will keep or discard it in hooks based on the scenario result
        //    recordVideo: { dir: 'reports/videos/.raw', size: { width: 1920, height: 1080 } },
        //   viewport: { width: 1920, height: 1080 },
        //    // Keep viewport null if you prefer full window size; comment out next line to use maximized window size only
        //   // viewport: null,
        //    timeout: config.browser.timeout,
        //  });
      }
      this.page = await this.context.newPage();

      // Increase default navigation and page timeouts for LambdaTest
      if (config.executionMode === "lambda") {
        this.page.setDefaultNavigationTimeout(30000000); // 0 minutes
        this.page.setDefaultTimeout(30000000); // 50 minutes
      } else {
        this.page.setDefaultNavigationTimeout(30000000);
        this.page.setDefaultTimeout(30000000);
      }
    } catch (error) {
      console.error("Failed to initialize browser:", error);
      throw error;
    }
  }

  async takeScreenshot(path) {
    if (this.page) {
      try {
        return await this.page.screenshot({
          path: path,
          fullPage: true,
        });
      } catch (error) {
        console.error("Failed to take screenshot:", error);
        return null;
      }
    }
    return null;
  }




  async cleanup() {
    try {
      if (this.page) {
        try {
          await this.page.close().catch(err => console.log('Page close error:', err));
        } catch (error) {
          console.log('Ignoring page close error:', error);
        }
      }
      if (this.context) {
        try {
          await this.context.close().catch(err => console.log('Context close error:', err));
        } catch (error) {
          console.log('Ignoring context close error:', error);
        }
      }
      if (this.browser) {
        try {
          await this.browser.close().catch(err => console.log('Browser close error:', err));
        } catch (error) {
          console.log('Ignoring browser close error:', error);
        }
      }
    } catch (error) {
      console.error("Error during cleanup:", error);
    }
  }
}

setWorldConstructor(BrowserType);