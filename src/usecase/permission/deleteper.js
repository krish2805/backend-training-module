
module.exports = ({ permissionRepo }) => {
    return async ({ id }) => {
        if (!id) {
            throw new Error("id is required");
        }

        return permissionRepo.deletePermission({ id });
    };
};
