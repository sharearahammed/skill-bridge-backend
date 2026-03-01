// admin.router.ts
import { Router } from "express";
import { AdminController } from "./admin.controler";


const router = Router();

// All routes protected, only admin access

router.get("/users", AdminController.getAllUsers);
router.patch("/user/:id/status", AdminController.updateUserStatus);

router.get("/bookings", AdminController.getAllBookings);

router.get("/categories", AdminController.getAllCategories);
router.post("/category", AdminController.createCategory);

export const adminRouter: Router = router;