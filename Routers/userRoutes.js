const express = require("express");
const authController = require("../Controllers/authController");
const userController = require("../Controllers/userController");

const Router = express.Router();

// Public routes (no authentication needed)
Router.post("/login", authController.Login);
Router.post(
  "/add-Employee",
  authController.uploadUserData,
  authController.create
);
Router.post("/forget-Password", authController.forgetPassword);
Router.patch("/reset-password", authController.resetPassword);
Router.get("/get-employee", userController.getEmployees);
// Protected routes
Router.use(authController.protect); // Apply protect middleware after public routes
Router.get("/verify-token", authController.verifyRole);
Router.post(
  "/update-profile/:id",
  userController.updateProfileData,
  userController.updateProfile
);

Router.patch("/addTask/:id", userController.addTask);
Router.patch("/update-task-status/:id", userController.updateTaskStatus);
Router.patch("/add-event/:empId", userController.addEvent);

module.exports = Router;
