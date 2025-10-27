import fs from "fs";

try {
  const report = JSON.parse(fs.readFileSync("./reports/cucumber-report.json", "utf-8"));

  let scenariosPassed = 0, scenariosFailed = 0;
  let stepsPassed = 0, stepsFailed = 0, stepsSkipped = 0;
  let totalDuration = 0;

  report.forEach(feature => {
    feature.elements?.forEach(scenario => {
      let failed = false;
      scenario.steps?.forEach(step => {
        const status = step.result?.status;
        const duration = step.result?.duration || 0; // assumed to be in seconds
        totalDuration += duration;

        if (status === "passed") stepsPassed++;
        else if (status === "failed") {
          stepsFailed++;
          failed = true;
        } else if (status === "skipped") stepsSkipped++;
      });
      failed ? scenariosFailed++ : scenariosPassed++;
    });
  });

  // Round total duration (already in seconds)
  const durationInSeconds = (totalDuration / 1_000_000_000).toFixed(2);

  const summary = `

**Scenarios:**  
🟩 ${scenariosPassed} passed  
🟥 ${scenariosFailed} failed  

**Steps:**  
🟩 ${stepsPassed} passed  
🟥 ${stepsFailed} failed  
🟧 ${stepsSkipped} skipped  

**⏱ Total Step Duration:** ${durationInSeconds} seconds  
📌 _Note: This is the sum of step durations (may exceed actual wall-clock time in parallel tests)._
`;

   // Display detailed failure information
  if (failureDetails.length > 0) {
    console.log("\n================ Detailed Failure Analysis ================\n");
    
    failureDetails.forEach((scenario, index) => {
      console.log(`🔥 FAILURE ${index + 1}: ${scenario.scenarioName}`);
      console.log(`📂 Feature: ${scenario.featureName}`);
      console.log(`📍 Line: ${scenario.line}`);
      if (scenario.tags) console.log(`🏷️  Tags: ${scenario.tags}`);
      
      scenario.failures.forEach((failure, failIndex) => {
        console.log(`\n   Step ${failIndex + 1}: "${failure.stepName}" (Line ${failure.line})`);
        
        if (failure.locator) {
          console.log(`   🎯 Locator: ${failure.locator}`);
        }
        
        if (failure.expected && failure.received) {
          console.log(`   ✅ Expected: ${failure.expected}`);
          console.log(`   ❌ Received: ${failure.received}`);
        }
        
        
        if (failure.errorMessage) {
          console.log(`   📝 Error Details:`);
          // Split long error messages for better readability
          const errorLines = failure.errorMessage.split('\n');
          errorLines.forEach(line => {
            if (line.trim()) {
              console.log(`      ${line.trim()}`);
            }
          });
        }
      });
      
      console.log("\n" + "─".repeat(60));
    });
  }

  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
    console.log("✅ Test summary added to GitHub step summary");
  } else {
    console.log("✅ Test Summary:");
    console.log(summary);
  }
} catch (error) {
  console.error("❌ Error generating test summary:", error.message);
  process.exit(1);
}
