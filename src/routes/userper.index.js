
const express = require("express");

const { UserPermission } = require("../../models");
const createUserPermissionRepo = require("../data-acess/user-permission");
const createUserPermissionControllers = require("../controller/userper.index");
const createMiddlewares = require("../middleware");
const createUserPerRoute = require("./userper");

module.exports = () => {
    const router = express.Router();

    const userPermissionRepo = createUserPermissionRepo({ UserPermission });
    const { userPermissionController } = createUserPermissionControllers({
        userPermissionRepo,
    });
    const { authMiddleware, adminMiddleware } = createMiddlewares();

    router.use(
        "/user-permissions",
        createUserPerRoute({
            userPermissionController,
            authMiddleware,
            adminMiddleware,
        })
    );

    return router;
};
