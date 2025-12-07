const express = require("express");

const { Item } = require("../../../models");
const createItemRepo = require("../../data-acess/itemrepo");
const createItemControllers = require("../../controller/items/item.index");
const createMiddlewares = require("../../middleware");
const createItemRoute = require("./item.route");

module.exports = () => {
    const router = express.Router();

    // repos
    const itemRepo = createItemRepo({ Item });

    // controllers
    const { itemController } = createItemControllers({
        itemRepo,
    });

    const { authMiddleware, adminMiddleware, permissionMiddleware } =
        createMiddlewares();


    router.use(
        "/items",
        createItemRoute({
            itemController,
            authMiddleware,
            adminMiddleware,
            permissionMiddleware,
        })
    );

    return router;
};
