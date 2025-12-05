// crone-job/index.js
const cron = require("node-cron");
const { runCronTask } = require("./crone");

// Runs every 1 minute (for testing)
// Change schedule as needed (examples below)
cron.schedule("* * * * *", async () => {
    console.log("⏳ CRON JOB TRIGGERED:", new Date().toISOString());
    await runCronTask();
});
