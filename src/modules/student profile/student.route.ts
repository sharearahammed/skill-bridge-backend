import express, { Router } from "express";
import { StudentController } from "./student.controller";

const router = express.Router();

// Update student info (name & image)
router.patch("/:userId", StudentController.updateStudent);

export const StudentProfileRouter: Router = router;