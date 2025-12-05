
module.exports = ({ userPermissionRepo }) => {
    return async ({
        userId,
        moduleCode,
        canCreate,
        canUpdate,
        canDelete,
        canView,
    }) => {
        if (!userId || !moduleCode) {
            throw new Error("userId and moduleCode are required");
        }

     updateUserPermissionUsecase =  userPermissionRepo.updateUserPermission({
            userId,
            moduleCode,
            canCreate,
            canUpdate,
            canDelete,
            canView,
        });
        return updateUserPermissionUsecase;
    };

};
