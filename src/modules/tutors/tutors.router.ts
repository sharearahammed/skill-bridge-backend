// tutors.router.ts
import { Router } from "express";
import { TutorsController } from "./tutors.controller";

const router = Router();

// Public browsing - students can view tutors without login
router.get("/", TutorsController.getAllTutors);
router.get("/:id", TutorsController.getTutorProfile);

export const tutorsRouter: Router = router;