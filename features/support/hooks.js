import { Before, After, BeforeAll, setDefaultTimeout, BeforeStep, AfterStep } from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';
import { cleanupDirectories } from '../../utils/cleanup.js';

setDefaultTimeout(30000000); // 50 mins

BeforeAll(async function () {
  try {
    cleanupDirectories();

    if (!fs.existsSync('reports')) fs.mkdirSync('reports', { recursive: true });

    const rawDir = path.join('reports', 'videos', '.raw');
    const failedDir = path.join('reports', 'videos', 'failed');
    const passedDir = path.join('reports', 'videos', 'passed');
    [rawDir, failedDir, passedDir].forEach(dir => {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    });
  } catch (error) {
    console.error('Error creating/accessing reports directory:', error);
    throw error;
  }
});

Before(async function (scenario) {
  try {
    if (!scenario.pickle.name.includes('[RETRY]')) this.retryAttempt = 0;
    await this.init();

    this.conversationUrl = null;
    this.currentScenario = scenario;
    this.startTime = Date.now();

    const v = this.page?.video?.();
    if (v && typeof v.path === 'function') {
      this._videoPathPromise = v.path();
    }

    console.log(`▶️ Starting scenario: ${scenario.pickle.name}`);
  } catch (error) {
    console.error('Error in Before hook:', error);
    throw error;
  }
});

BeforeStep(function ({ pickleStep }) {
  console.log(pickleStep.text);
});

AfterStep(function ({ result }) {
  if (result.status !== 'PASSED') {
    console.log(`    × failed`);
    if (result.exception) {
      console.log(`      Error: ${result.exception.message}`);
    }
  }
});

After(async function ({ result, pickle, willBeRetried }) {
  try {
    const scenarioName = pickle?.name || 'Unknown Scenario';
    const executionTime = Date.now() - this.startTime;

    // Capture conversation URL if available
    if (this.page) {
      try {
        const url = await this.page.url();
        if (url && (url.includes('conversation') || url.includes('chatllm'))) {
          this.conversationUrl = url;
          console.log(`Captured conversation URL: ${url}`);
        }
      } catch (urlError) {
        console.error('Failed to capture conversation URL:', urlError);
      }
    }

    if (result.status === 'FAILED' || result.status === 'SKIPPED' || result.status === 'PENDING') {
      if (result.status !== 'FAILED') result.status = 'FAILED';

      if (willBeRetried) {
        this.retryAttempt++;
        console.log(`🔄 RETRY ${this.retryAttempt}/${this.maxRetries}: ${scenarioName}`);
        const screenshotPath = `reports/retry-${this.retryAttempt}-${Date.now()}.png`;
        await this.takeScreenshot(screenshotPath).catch(() => {});
        await this.cleanup();
        return;
      }

      console.log(`❌ FAILED: ${scenarioName}`);
      console.log(`Error Details: ${result.exception?.message || 'No message'}`);

      // Screenshot
      if (this.page) {
        const screenshotPath = `reports/failure-${Date.now()}.png`;
        try {
          const ss = await this.takeScreenshot(screenshotPath);
          if (ss) console.log(`❌ Screenshot saved: ${screenshotPath}`);
        } catch (e) {
          console.error('Screenshot error:', e);
        }
      }

      // Save failure video
      try {
        const video = this.page?.video?.();
        if (video && typeof video.path === 'function') {
          try {
            await this.page.close(); // ensure video finalized
          } catch (_) {}

          const tempPath = await video.path();
          const baseName = `${Date.now()}-${scenarioName.replace(/[^a-zA-Z0-9-_]/g, '_')}.webm`;
          const finalPath = path.join('reports', 'videos', 'failed', baseName);
          fs.mkdirSync(path.dirname(finalPath), { recursive: true });
          fs.copyFileSync(tempPath, finalPath);
          console.log(`🎬 Failure video saved: ${finalPath}`);
          // flush ensure 2 sec
          await new Promise(r => setTimeout(r, 2000));
        }
      } catch (videoErr) {
        console.warn('Could not save failure video:', videoErr?.message || videoErr);
      }

      console.log(`\x1b[31m❌\x1b[0m Scenario failed: ${scenarioName} (${result.status}) - ${executionTime}ms`);
    } else {
      console.log(`\x1b[92m✅\x1b[0m Scenario completed: ${pickle.name} (passed) - ${executionTime}ms`);
    }
  } catch (error) {
    console.error('Error in After hook:', error);
  } finally {
    // Ensure cleanup always runs
    await this.cleanup().catch(e => console.error('Cleanup failed:', e));
  }
});
