import express, { Router } from "express";
import { CategoryController } from "./category.controller.js";

const router = express.Router();

router.post("/", CategoryController.createCategory);
router.get("/", CategoryController.getCategories);

export const CategoryRouter: Router = router;