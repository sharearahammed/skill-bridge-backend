import express, { Router } from "express";
import authMiddleware, { UserRole } from "../../lib/middlewares/auth.js";
import { ReviewController } from "./review.controller.js";

const router = express.Router();

// Student add review
router.post(
  "/",
  authMiddleware(UserRole.STUDENT),
  // authMiddleware(UserRole.TUTOR),
  ReviewController.createReview,
);

// Student update review
router.patch(
  "/:reviewId",
  authMiddleware(UserRole.STUDENT),
  ReviewController.updateReview,
);

// Get tutor reviews
router.get(
  "/tutor/:tutorId/:categoryId/reviews",
  authMiddleware(UserRole.TUTOR),
  ReviewController.getTutorReviewsByCategory,
);

router.get("/tutor/:tutorId", ReviewController.getTutorReviews);

// Student review by category
router.get("/student-review", ReviewController.getStudentReview);

router.get("/:id", ReviewController.getReviewById);

export const reviewRouter: Router = router;
