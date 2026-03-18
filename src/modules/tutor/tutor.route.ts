import express, { Router } from "express";
import authMiddleware, { UserRole } from "../../lib/middlewares/auth.js";
import { TutorController } from "./tutor.controller.js";

const router = express.Router();

router.post(
  "/profile",
  authMiddleware(UserRole.TUTOR),
  TutorController.createOrUpdateProfile,
);
router.post(
  "/availability",
  authMiddleware(UserRole.TUTOR, UserRole.STUDENT),
  TutorController.createAvailability,
);

router.get("/sessions", authMiddleware(UserRole.TUTOR, UserRole.STUDENT), TutorController.getTutorSessions);

router.get(
  "/tutor/:tutorId/category/:categoryId/reviews",
  authMiddleware(UserRole.TUTOR),
  TutorController.getTutorReviews
);

export const tutorRouter: Router = router;
