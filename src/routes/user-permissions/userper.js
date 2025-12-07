const express = require("express");

module.exports = ({
    userPermissionController,
    authMiddleware,
    adminMiddleware,
}) => {

    const router = express.Router();

    router.post(
        "/",
        authMiddleware,
        adminMiddleware,
        userPermissionController.createUserPermission
    );

    router.patch(
        "/",
        authMiddleware,
        adminMiddleware,
        userPermissionController.updateUserPermission
    );

    return router;
};
