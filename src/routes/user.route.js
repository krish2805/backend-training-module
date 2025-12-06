const express = require("express");

module.exports = ({ userController, authMiddleware,  permissionMiddleware  }) => {
const router = express.Router();

 const { hasPermission } = permissionMiddleware;

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", authMiddleware, userController.profile);
router.get("/:id", authMiddleware, userController.getById);
router.patch("/password",authMiddleware,userController.updatePassword);
router.patch("/profile",authMiddleware,userController.updateProfile);
router.delete("/me",authMiddleware,userController.softDeleteUser);
router.get("/:id",authMiddleware,hasPermission("USER", "view"),userController.getById);
router.patch("/:id",authMiddleware,hasPermission("USER", "update"),userController.updateProfile);
router.delete("/:id",authMiddleware,hasPermission("USER", "delete"),userController.softDeleteUser);
//router.post("/create-by-permission",authMiddleware,hasPermission("USER", "create"),userController.createUserWithPermission);

return router; 
};
