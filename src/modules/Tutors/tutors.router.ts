import { Router } from "express";
import { TutorsController } from "./tutors.controler";
import authMiddleware, { UserRole } from "../../lib/middlewares/auth";

const router = Router();

router.get("/", TutorsController.getAllTutors);
router.get("/:id", TutorsController.getTutorProfile);
router.post(
  "/profile",
  authMiddleware(UserRole.TUTOR),
  TutorsController.createOrUpdateProfile,
);

router.post("/slot", authMiddleware(UserRole.TUTOR), TutorsController.createSlot);
router.get("/slot/all", authMiddleware(UserRole.TUTOR), TutorsController.getSlots);
router.put("/slot/:id", authMiddleware(UserRole.TUTOR), TutorsController.updateSlot);
router.delete(
  "/slot/:id",
  authMiddleware(UserRole.TUTOR),
  TutorsController.deleteSlot,
);
export const tutorsRouter: Router = router;
