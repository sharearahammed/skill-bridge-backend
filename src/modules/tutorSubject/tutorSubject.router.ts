import express, { Router } from "express";
import authMiddleware, { UserRole } from "../../lib/middlewares/auth.js";
import { TutorSubjectController } from "./tutorSubject.controller.js";

const router = express.Router();

router.post(
  "/subjects",
  authMiddleware(UserRole.TUTOR),
  TutorSubjectController.addSubjects,
);

router.get(
  "/tutor/:userId/subjects",
  authMiddleware(UserRole.TUTOR),
  TutorSubjectController.getSubjects,
);

export const tutorSubjectRouter: Router = router;
