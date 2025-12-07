
const express = require("express");
const upload = require("../../middleware/upload");

module.exports = ({ itemController, authMiddleware, permissionMiddleware }) => {
    const router = express.Router();

    router.post(
        "/",
        authMiddleware,
        permissionMiddleware.hasPermission("ITEM", "create"),
        upload.array("pictures", 5),
        itemController.createItem
    );

    router.post(
        "/:item_code/version",
        authMiddleware,
        permissionMiddleware.hasPermission("ITEM", "create"),
        upload.array("pictures", 5),
        itemController.createNewVersion
    );

    router.get("/:item_code", itemController.getLatestItem);

    router.get("/:item_code/versions", itemController.getAllVersions);

    return router;
};
