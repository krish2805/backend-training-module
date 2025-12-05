
module.exports = ({ permissionRepo }) => {
    return async ({ id, moduleCode, moduleDescription, isActive }) => {
        if (!id) {
            throw new Error("id is required");
        }

       
        const existing = await permissionRepo.findById(id);
        if (!existing) {
            throw new Error("Permission module not found");
        }

        return permissionRepo.updatePermission({
            id,
            moduleCode: moduleCode ?? existing.module_code,
            moduleDescription: moduleDescription ?? existing.module_description,
            isActive: typeof isActive === "boolean" ? isActive : existing.is_active,
        });
    };
};
