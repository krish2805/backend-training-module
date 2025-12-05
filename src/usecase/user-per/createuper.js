
module.exports = ({ userPermissionRepo }) => {
    return async ({
        userId,
        moduleCode,
        canCreate = false,
        canUpdate = false,
        canDelete = false,
        canView = false,
    }) => {
        if (!userId || !moduleCode) {
            throw new Error("userId and moduleCode are required");
        }

        createUserPermissionUsecase=userPermissionRepo.createUserPermission({
            userId,
            moduleCode,
            canCreate,
            canUpdate,
            canDelete,
            canView,
        });
        return createUserPermissionUsecase;
    };
};
