import express, { Router } from "express";
import authMiddleware, { UserRole } from "../../lib/middlewares/auth.js";
import { AvailabilityController } from "./availability.controller.js";

const router = express.Router();


router.post("/availability",  authMiddleware(UserRole.TUTOR), AvailabilityController.createSlot);
router.get("/availability",  authMiddleware(UserRole.TUTOR), AvailabilityController.getSlots);

export const availableRouter: Router = router;
