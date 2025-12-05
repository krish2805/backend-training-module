
const express = require("express");

const createUserRoute = require("./user.route");
const createMiddlewares = require("../middleware/index");
const createControllers = require("../controller/user.index");

const { User } = require("../../models");
const createUserRepo = require("../data-acess/userepo");
const { hashPassword, comparePassword } = require("../config/password");

function createRoutes() {
    const router = express.Router();


    const userRepo = createUserRepo({ User });

    const { userController } = createControllers({
        userRepo,
        hashPassword,
        comparePassword,
    });


    const { authMiddleware, adminMiddleware, haspermission } = createMiddlewares();


    router.use(
        "/users",
        createUserRoute({ userController, authMiddleware, adminMiddleware,haspermission })
    );

    return router;
}

module.exports = createRoutes;
