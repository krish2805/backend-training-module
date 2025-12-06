const express = require("express");

const createUserRoute = require("./user.route");
const createMiddlewares = require("../middleware/index");
const createControllers = require("../controller/user.index");

const { User, Userpermission } = require("../../models");

const createUserRepo = require("../data-acess/userepo");
const createUserPermissionRepo = require("../data-acess/user-permission");  
const { hashPassword, comparePassword } = require("../config/password");
const createPermissionMiddleware = require("../middleware/permission.middleware"); 
function createRoutes() {
    const router = express.Router();

    const userRepo = createUserRepo({ User });
    const userPermissionRepo = createUserPermissionRepo({ Userpermission }); 

    const { userController } = createControllers({
        userRepo,
        hashPassword,
        comparePassword,
    });

    const { authMiddleware, adminMiddleware } = createMiddlewares();

    const permissionMiddleware = createPermissionMiddleware({ userPermissionRepo });

    router.use(
        "/users",
        createUserRoute({ userController, authMiddleware, adminMiddleware, permissionMiddleware }) 
    );

    return router;
}

module.exports = createRoutes;

