
const createPermissionController = require("./permission.controller");

const createPermissionUsecaseFactory = require("../usecase/permission/createper");
const updatePermissionUsecaseFactory = require("../usecase/permission/updateper");
const deletePermissionUsecaseFactory = require("../usecase/permission/deleteper");

function createPermissionControllers({ permissionRepo }) {
    const createPermissionUsecase = createPermissionUsecaseFactory({ permissionRepo });
    const updatePermissionUsecase = updatePermissionUsecaseFactory({ permissionRepo });
    const deletePermissionUsecase = deletePermissionUsecaseFactory({ permissionRepo });

    const permissionController = createPermissionController({
        createPermissionUsecase,
        updatePermissionUsecase,
        deletePermissionUsecase,
    });

    return { permissionController };
}

module.exports = createPermissionControllers;
