import express from "express";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";

import addBookController from "../controllers/bookControllers/addBookController.js";
import getBooksController from "../controllers/bookControllers/getBooksController.js";
import getBookDetailsController from "../controllers/bookControllers/getBookDetailsController.js";
import updateBookController from "../controllers/bookControllers/updateBookController.js";
import deleteBookController from "../controllers/bookControllers/deleteBookController.js";

const router = express.Router();

router.get("/", isAuthenticated, getBooksController);
router.get("/detail/:id", isAuthenticated, getBookDetailsController);
router.post("/new", isAuthenticated, isAdmin, addBookController);
router.put("/:id", isAuthenticated, isAdmin, updateBookController);
router.delete("/:id", isAuthenticated, isAdmin, deleteBookController);

export default router;
