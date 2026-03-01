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

export const BookingController = {
  createBooking,
  getStudentBookings,
  getTutorBookings,
  updateBookingStatus,
  myBookings
};
