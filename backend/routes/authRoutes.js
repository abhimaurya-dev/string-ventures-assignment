import express from "express";
import loginController from "../controllers/authControllers/loginController.js";
import registerController from "../controllers/authControllers/registerController.js";
import getAllUsersController from "../controllers/authControllers/getAllUsersController.js";
import getUserDetailController from "../controllers/authControllers/getUserDetailController.js";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", isAuthenticated, isAdmin, registerController);
router.get("/get-users", isAuthenticated, isAdmin, getAllUsersController);
router.get(
  "/get-user-detail/:id",
  isAuthenticated,
  isAdmin,
  getUserDetailController
);
router.post("/register-admin", registerController);
router.post("/login", loginController);

export default router;
