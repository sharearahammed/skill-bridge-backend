// admin.router.ts
import { Router } from "express";
import { AdminController } from "./admin.controler";
import authMiddleware, { UserRole } from "../../lib/middlewares/auth";

const router = Router();

// All routes protected, only admin access

router.get(
  "/users",
  authMiddleware(UserRole.ADMIN),
  AdminController.getAllUsers,
);
router.patch(
  "/user/:id/status",
  authMiddleware(UserRole.ADMIN),
  AdminController.updateUserStatus,
);

router.get("/bookings", AdminController.getAllBookings);

router.get("/categories", AdminController.getAllCategories);
router.post(
  "/category",
  authMiddleware(UserRole.ADMIN),
  AdminController.createCategory,
);

export const adminRouter: Router = router;
