

module.exports = ({ userRepo }) =>
    async function updateProfileUsecase({ userId, profileData }) {
        const allowed = {
            username: profileData.username,
            address1: profileData.address1,
            address2: profileData.address2,
            phone_number: profileData.phone_number,
        };

        // remove undefined keys
        Object.keys(allowed).forEach(
            (key) => allowed[key] === undefined && delete allowed[key]
        );

        const updatedUser = await userRepo.updateById(userId, allowed);

        if (!updatedUser) {
            throw new Error("User not found");
        }

        const plainUser = updatedUser.toJSON();
        delete plainUser.password;
        return plainUser;
    };
