
const cron = require("node-cron");

module.exports = ({ userRepository }) => {

    cron.schedule("*/1 * * * *", async () => {
        try {
            console.log("Cron start: hard delete soft-deleted users");
            const deleted = await userRepository.hardDeleteSoftDeletedUsers();
            console.log("Cron done, deleted:", deleted);
        } catch (err) {
            console.error("Cron error:", err);
        }
    });
};
