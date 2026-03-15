"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const booking_service_1 = require("./booking.service");
// Student books a slot
const createBooking = async (req, res) => {
    const studentId = req.user.id;
    try {
        const booking = await booking_service_1.BookingService.createBooking(studentId, req.body.availabilityId);
        res.json({ success: true, data: booking });
    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
// Student view own bookings
const getStudentBookings = async (req, res) => {
    const studentId = req.user.id;
    const bookings = await booking_service_1.BookingService.getStudentBookings(studentId);
    res.json({ success: true, data: bookings });
};
// Tutor view own bookings
const getTutorBookings = async (req, res) => {
    const tutorId = req.user.id;
    const bookings = await booking_service_1.BookingService.getTutorBookings(tutorId);
    res.json({ success: true, data: bookings });
};
// Update booking status (Admin or Tutor)
const updateBookingStatus = async (req, res) => {
    const { bookingId, status } = req.body;
    const booking = await booking_service_1.BookingService.updateBookingStatus(bookingId, status);
    res.json({ success: true, data: booking });
};
const myBookings = async (req, res) => {
    const userId = req.user.id;
    const bookings = await booking_service_1.BookingService.getUserBookings(userId);
    res.json({ success: true, data: bookings });
};
const attendSessionController = async (req, res) => {
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
        const bookingId = bookingIdParam;
        const updatedBooking = await booking_service_1.BookingService.attendSession(studentId, bookingId);
        return res.status(200).json({
            success: true,
            message: "Session marked as attended",
            data: updatedBooking,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to attend session",
        });
    }
};
exports.BookingController = {
    createBooking,
    getStudentBookings,
    getTutorBookings,
    updateBookingStatus,
    myBookings,
    attendSessionController,
};
//# sourceMappingURL=booking.controller.js.map