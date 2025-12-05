

const createUserPermissionController = require("./userpermission.controller");

const createUserPermissionUsecaseFactory = require("../usecase/user-per/createuper");
const updateUserPermissionUsecaseFactory = require("../usecase/user-per/updateuper");

function createUserPermissionControllers({ userPermissionRepo }) {
    const createUserPermissionUsecase = createUserPermissionUsecaseFactory({
        userPermissionRepo,
    });

    const updateUserPermissionUsecase = updateUserPermissionUsecaseFactory({
        userPermissionRepo,
    });

    const userPermissionController = createUserPermissionController({
        createUserPermissionUsecase,
        updateUserPermissionUsecase,
    });

    return { userPermissionController };
}

module.exports = createUserPermissionControllers;


