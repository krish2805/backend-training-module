const express = require("express");

module.exports = ({ userController, authMiddleware, haspermission }) => {
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", authMiddleware, userController.profile);
router.get("/:id", authMiddleware, userController.getById);
router.patch("/password",authMiddleware,userController.updatePassword);
router.patch("/profile",authMiddleware,userController.updateProfile);
router.delete("/me",authMiddleware,userController.softDeleteUser);
return router; 
};
