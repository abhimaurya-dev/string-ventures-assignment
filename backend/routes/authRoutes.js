import express from "express";
import loginController from "../controllers/authControllers/loginController.js";
import registerController from "../controllers/authControllers/registerController.js";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", isAuthenticated, isAdmin, registerController);
router.post("/register-admin", registerController);
router.post("/login", loginController);

export default router;
