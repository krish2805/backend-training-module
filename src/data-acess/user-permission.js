
module.exports = ({ UserPermission }) => {
    async function createUserPermission({
        userId,
        moduleCode,
        canCreate = false,
        canUpdate = false,
        canDelete = false,
        canView = false,
    }) {
        const existing = await UserPermission.findOne({
            where: { user_id: userId, module_code: moduleCode },
        });

        if (existing) {
            throw new Error("Permission already exists for this user and module");
        }

        return UserPermission.create({
            user_id: userId,
            module_code: moduleCode,
            can_create: canCreate,
            can_update: canUpdate,
            can_delete: canDelete,
            can_view: canView,
        });
    }

    async function updateUserPermission({
        userId,
        moduleCode,
        canCreate,
        canUpdate,
        canDelete,
        canView,
    }) {
        const existing = await UserPermission.findOne({
            where: { user_id: userId, module_code: moduleCode },
        });

        if (!existing) {
            throw new Error("User permission not found for this module");
        }

        if (typeof canCreate === "boolean") existing.can_create = canCreate;
        if (typeof canUpdate === "boolean") existing.can_update = canUpdate;
        if (typeof canDelete === "boolean") existing.can_delete = canDelete;
        if (typeof canView === "boolean") existing.can_view = canView;

        await existing.save();
        return existing;
    }

    async function getPermission(userId, moduleCode) {
        return UserPermission.findOne({
            where: { user_id: userId, module_code: moduleCode },
        });
    }

    return {
        createUserPermission,
        updateUserPermission,
        getPermission,
    };
};
