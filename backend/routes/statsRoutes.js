import express from "express";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";
import getStatsController from "../controllers/statsControllers/getStatsController.js";

const router = express.Router();

router.get("/", isAuthenticated, isAdmin, getStatsController);

export default router;
