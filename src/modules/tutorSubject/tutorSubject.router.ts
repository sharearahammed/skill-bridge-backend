import express, { Router } from "express";
import { TutorSubjectController } from "./tutorSubject.controller";
import authMiddleware, { UserRole } from "../../lib/middlewares/auth";

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
