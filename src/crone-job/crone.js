

async function runCronTask() {
    try {
        console.log("🔁 Running scheduled task...");

    } catch (error) {
        console.error("❌ CRON JOB ERROR:", error.message);
    }
}

module.exports = { runCronTask };


