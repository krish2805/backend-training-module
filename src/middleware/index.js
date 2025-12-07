const authMiddleware = require("./auth_middleware");
const adminMiddleware = require("./admin_middleware");
const createPermissionMiddleware = require("./permission.middleware");

const { UserPermission } = require("../../models");
const createUserPermissionRepo = require("../data-acess/user-permission");

function createMiddlewares() {
    const userPermissionRepo = createUserPermissionRepo({ UserPermission });

    const permissionMiddleware = createPermissionMiddleware({
        userPermissionRepo,
    });

    return {
        authMiddleware,
        adminMiddleware,
        permissionMiddleware, };
    }


module.exports = createMiddlewares;
