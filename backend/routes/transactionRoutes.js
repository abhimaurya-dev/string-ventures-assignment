import express from "express";
import transactionController from "../controllers/transactionControllers/transactionController.js";
import getUserTransactionController from "../controllers/transactionControllers/getUserTransactionController.js";
import getTransactionsController from "../controllers/transactionControllers/getTransactionsController.js";
import { isAdmin, isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get", isAuthenticated, isAdmin, getTransactionsController);
router.get("/get-user", isAuthenticated, getUserTransactionController);
router.post("/create", isAuthenticated, transactionController);

export default router;
