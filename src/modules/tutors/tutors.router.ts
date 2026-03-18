// tutors.router.ts
import { Router } from "express";
import { TutorsController } from "./tutors.controller.js";

const router = Router();

// Public browsing - students can view tutors without login
// GET /allTutors?categoryId=xxx&minRating=4&maxRate=500
router.get("/", TutorsController.getAllTutors);
router.get("/:id", TutorsController.getTutorProfile);
router.get("/featured/tutor", TutorsController.getFeaturedTutors);

export const tutorsRouter: Router = router;