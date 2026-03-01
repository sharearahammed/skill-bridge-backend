import express, { Router } from "express";
import { TutorController } from "./tutor.controller";
import authMiddleware, { UserRole } from "../../lib/middlewares/auth";

const router = express.Router();

router.post(
  "/profile",
  authMiddleware(UserRole.TUTOR),
  TutorController.createOrUpdateProfile,
);

export const tutorRouter: Router = router;
