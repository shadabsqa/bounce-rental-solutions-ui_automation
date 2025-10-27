import fs from "fs";

try {
  const reportPath = "./reports/cucumber-report.json";
  if (!fs.existsSync(reportPath)) {
    console.error("❌ cucumber-report.json not found at:", reportPath);
    process.exit(1);
  }

  const report = JSON.parse(fs.readFileSync(reportPath, "utf-8"));

  let scenariosPassed = 0,
    scenariosFailed = 0;
  let stepsPassed = 0,
    stepsFailed = 0,
    stepsSkipped = 0;
  let totalDuration = 0;

  // Collect ALL errors
  const errorDetails = [];

  report.forEach((feature) => {
    feature.elements?.forEach((scenario) => {
      let failed = false;
      scenario.steps?.forEach((step) => {
        const status = step.result?.status;
        const duration = step.result?.duration || 0;
        totalDuration += duration;

        if (status === "passed") stepsPassed++;
        else if (status === "failed") {
          stepsFailed++;
          failed = true;

          // Capture full error message and stack trace
          const errorMessage = step.result?.error_message || "Unknown error";
          errorDetails.push({
            feature: feature.name || "Unnamed Feature",
            scenario: scenario.name || "Unnamed Scenario",
            step: step.name || "Unnamed Step",
            message: errorMessage.trim(),
          });
        } else if (status === "skipped") stepsSkipped++;
      });

      failed ? scenariosFailed++ : scenariosPassed++;
    });
  });

  const durationInSeconds = (totalDuration / 1_000_000_000).toFixed(2);

  // ✅ Build full error section
  let errorSummary = "";
  if (errorDetails.length > 0) {
    errorSummary += `\n\n**❌ Detailed Error Report (${errorDetails.length} failed steps):**\n\n`;

    errorDetails.forEach((err, index) => {
      errorSummary += `### 🔹 Failure #${index + 1}\n`;
      errorSummary += `**Feature:** ${err.feature}\n\n`;
      errorSummary += `**Scenario:** ${err.scenario}\n\n`;
      errorSummary += `**Step:** ${err.step}\n\n`;
      errorSummary += `**Error Message:**\n\`\`\`\n${err.message}\n\`\`\`\n\n`;
      errorSummary += `---\n`;
    });
  } else {
    errorSummary = "\n✅ No errors detected — all tests passed!";
  }

  // ✅ Combine all summary info
  const summary = `
**🧪 BRS Test Summary**

**Scenarios:**  
🟩 ${scenariosPassed} passed  
🟥 ${scenariosFailed} failed  

**Steps:**  
🟩 ${stepsPassed} passed  
🟥 ${stepsFailed} failed  
🟧 ${stepsSkipped} skipped  

**⏱ Total Step Duration:** ${durationInSeconds} seconds  

${errorSummary}

📌 _Note: Step durations represent cumulative runtime (may exceed wall time if tests ran in parallel)._
`;

  // ✅ Output to GitHub summary and console
  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
    console.log("✅ Test summary with detailed errors added to GitHub summary.");
  } else {
    console.log(summary);
  }
} catch (error) {
  console.error("❌ Error generating test summary:", error.message);
  process.exit(1);
}
