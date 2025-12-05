
const express = require("express");

module.exports = ({ permissionController, authMiddleware, adminMiddleware }) => {
    const router = express.Router();

    
    router.post( "/",authMiddleware,adminMiddleware,permissionController.createModule);
    router.patch("/:id",authMiddleware,adminMiddleware,permissionController.updateModule);
    router.delete("/:id",authMiddleware,adminMiddleware,permissionController.deleteModule);

    return router;
};

