import express, { Router } from "express";
import { ReviewController } from "./review.controller";
import authMiddleware, { UserRole } from "../../lib/middlewares/auth";

const router = express.Router();

// Student add review
router.post(
  "/",
  authMiddleware(UserRole.STUDENT),
  // authMiddleware(UserRole.TUTOR),
  ReviewController.createReview,
);

// Get tutor reviews
router.get("/:tutorId", ReviewController.getTutorReviews);

export const reviewRouter: Router = router;
