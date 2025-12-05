
module.exports = ({ permissionRepo }) => {
    return async ({ moduleCode, moduleDescription, isActive = true, createdBy }) => {
        if (!moduleCode || !moduleDescription) {
            throw new Error("moduleCode and moduleDescription are required");
        }

        return permissionRepo.createPermission({
            moduleCode,
            moduleDescription,
            isActive,
            createdBy,
        });
    };
};
