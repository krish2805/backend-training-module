const express = require("express");

const createUserRoute = require("./user.route");
const createMiddlewares = require("../../middleware/index");
const createControllers = require("../../controller/users/user.index");

const { User, UserPermission } = require("../../../models");

const createUserRepo = require("../../data-acess/userrepo");

console.log('Is User model defined?', User ? 'Yes' : 'No');
const userRepo = createUserRepo({ User });
const createUserPermissionRepo = require("../../data-acess/user-permission");  

const { hashPassword, comparePassword } = require("../../config/password");
const createPermissionMiddleware = require("../../middleware/permission.middleware"); 
function createRoutes() {
    const router = express.Router();

    
    const userPermissionRepo = createUserPermissionRepo({ UserPermission }); 

    const { userController } = createControllers({
        userRepo,
        userPermissionRepo,
        hashPassword,
        comparePassword,
    });

    const { authMiddleware, adminMiddleware } = createMiddlewares();
    const { hasPermission } = createPermissionMiddleware({ userPermissionRepo });

    router.use(
        "/users",
        createUserRoute({ userController, authMiddleware, adminMiddleware, hasPermission}) 
    );

    return router;
}

module.exports = createRoutes;

