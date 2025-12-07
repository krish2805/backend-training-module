// src/usecase/user/updateprofile.js
module.exports = ({ userRepo }) =>
    async function updateProfileUsecase({ userId, profileData }) {
        // Only allow these fields to be updated
        const updates = {};

        if (profileData.username !== undefined) {
            updates.username = profileData.username;
        }
        if (profileData.address1 !== undefined) {
            updates.address1 = profileData.address1;
        }
        if (profileData.address2 !== undefined) {
            updates.address2 = profileData.address2;
        }
        if (profileData.phone_number !== undefined) {
            updates.phone_number = profileData.phone_number;
        }

        // nothing to update
        if (Object.keys(updates).length === 0) {
            throw new Error("No valid fields provided to update");
        }

        // make sure user exists
        const existing = await userRepo.findById(userId);
        if (!existing) {
            throw new Error("User not found");
        }

        try {
            const updatedUser = await userRepo.updateById(userId, updates);

            if (!updatedUser) {
                throw new Error("User not found");
            }

            const plainUser = updatedUser.toJSON();
            delete plainUser.password;
            return plainUser;
        } catch (err) {
            // turn Sequelize validation into a clearer message
            if (
                err.name === "SequelizeValidationError" ||
                err.name === "SequelizeUniqueConstraintError"
            ) {
                const first = err.errors && err.errors[0];
                throw new Error(first?.message || "Validation error");
            }
            throw err;
        }
    };
