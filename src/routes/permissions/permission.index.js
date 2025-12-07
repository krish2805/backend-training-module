
const express = require("express");

const { Permission } = require("../../../models");
const createPermissionRepo = require("../../data-acess/permission");
const createPermissionControllers = require("../../controller/permission/permission.index");
const createMiddlewares = require("../../middleware");
const createPermissionRoute = require("./permission");

module.exports = () => {
    const router = express.Router(); 

    const permissionRepo = createPermissionRepo({ Permission });

    const { permissionController } = createPermissionControllers({
        permissionRepo,
    });

    const { authMiddleware, adminMiddleware } = createMiddlewares();

    router.use(
        "/permissions",
        createPermissionRoute({
            permissionController,
            authMiddleware,
            adminMiddleware,
        })
    );

    return router; 
};
