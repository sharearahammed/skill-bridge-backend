import { Router } from "express";
import authMiddleware, { UserRole } from "../../lib/middlewares/auth";
import { CategoriesController } from "./admin.controler";

const router = Router();

// Only admin can create category
router.post(
  "/add-Categories",
//   authMiddleware(UserRole.ADMIN), 
  CategoriesController.createCategory
);

// Public: get all categories
router.get("/all-Categories", CategoriesController.getAllCategories);

export const adminRouter: Router = router;