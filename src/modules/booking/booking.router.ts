import express, { Router } from "express";
import { BookingController } from "./booking.controller";
import authMiddleware, { UserRole } from "../../lib/middlewares/auth";

const router = express.Router();

// Student
router.post(
  "/",
  authMiddleware(UserRole.STUDENT, UserRole.ADMIN, UserRole.TUTOR),
  BookingController.createBooking,
);
router.get("/student",authMiddleware(UserRole.STUDENT, UserRole.ADMIN, UserRole.TUTOR), BookingController.getStudentBookings);

// Tutor
router.get("/tutor",authMiddleware(UserRole.STUDENT, UserRole.ADMIN, UserRole.TUTOR), BookingController.getTutorBookings);

// Admin/Tutor update
router.patch("/status",authMiddleware(UserRole.STUDENT, UserRole.ADMIN, UserRole.TUTOR), BookingController.updateBookingStatus);

export const BookingRouter: Router = router;
