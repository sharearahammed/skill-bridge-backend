import express, { Router } from "express";
import { BookingController } from "./booking.controller";
import authMiddleware, { UserRole } from "../../lib/middlewares/auth";

const router = express.Router();

// Student
router.post(
  "/",
  authMiddleware(UserRole.STUDENT),
  BookingController.createBooking,
);
router.get(
  "/student",
  authMiddleware(UserRole.STUDENT, UserRole.ADMIN, UserRole.TUTOR),
  BookingController.getStudentBookings,
);

// Tutor
router.get(
  "/tutor",
  authMiddleware(UserRole.STUDENT, UserRole.ADMIN, UserRole.TUTOR),
  BookingController.getTutorBookings,
);

// Admin/Tutor update
router.patch(
  "/status",
  authMiddleware(UserRole.STUDENT, UserRole.ADMIN, UserRole.TUTOR),
  BookingController.updateBookingStatus,
);

// my booking
router.get(
  "/my-booking",
  authMiddleware(UserRole.STUDENT, UserRole.ADMIN, UserRole.TUTOR),
  BookingController.myBookings,
);

// Mark session as attended
router.patch(
  "/attend/:bookingId",
  authMiddleware(UserRole.STUDENT),
  BookingController.attendSessionController,
);

export const BookingRouter: Router = router;
