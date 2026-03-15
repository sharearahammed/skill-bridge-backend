import { Request, Response } from "express";
import { BookingService } from "./booking.service";

// Student books a slot
const createBooking = async (req: Request, res: Response) => {
  const studentId = req.user!.id;
  try {
    const booking = await BookingService.createBooking(
      studentId,
      req.body.availabilityId,
    );
    res.json({ success: true, data: booking });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Student view own bookings
const getStudentBookings = async (req: Request, res: Response) => {
  const studentId = req.user!.id;
  const bookings = await BookingService.getStudentBookings(studentId);
  res.json({ success: true, data: bookings });
};

// Tutor view own bookings
const getTutorBookings = async (req: Request, res: Response) => {
  const tutorId = req.user!.id;
  const bookings = await BookingService.getTutorBookings(tutorId);
  res.json({ success: true, data: bookings });
};

// Update booking status (Admin or Tutor)
const updateBookingStatus = async (req: Request, res: Response) => {
  const { bookingId, status } = req.body;
  const booking = await BookingService.updateBookingStatus(bookingId, status);
  res.json({ success: true, data: booking });
};

const myBookings = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const bookings = await BookingService.getUserBookings(userId);
  res.json({ success: true, data: bookings });
};

const attendSessionController = async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.id;
    if (!studentId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Student not found",
      });
    }

    const bookingIdParam = req.params.bookingId;

    // Validate bookingId
    if (!bookingIdParam) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required",
      });
    }

    if (Array.isArray(bookingIdParam)) {
      return res.status(400).json({
        success: false,
        message: "Booking ID must be a single string",
      });
    }

    const bookingId: string = bookingIdParam;

    const updatedBooking = await BookingService.attendSession(
      studentId,
      bookingId
    );

    return res.status(200).json({
      success: true,
      message: "Session marked as attended",
      data: updatedBooking,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to attend session",
    });
  }
};

export const BookingController = {
  createBooking,
  getStudentBookings,
  getTutorBookings,
  updateBookingStatus,
  myBookings,
  attendSessionController,
};
