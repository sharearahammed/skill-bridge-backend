"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const enums_1 = require("../../../generated/prisma/enums");
const prisma_1 = require("../../lib/prisma");
// Create a booking
const createBooking = async (studentId, availabilityId) => {
    // Check slot exists
    const slot = await prisma_1.prisma.availability.findUnique({
        where: { id: availabilityId },
    });
    if (!slot)
        throw new Error("Slot not found");
    // Check if slot already confirmed by someone
    const confirmedBooking = await prisma_1.prisma.booking.findFirst({
        where: {
            availabilityId,
            status: "CONFIRMED",
        },
    });
    if (confirmedBooking) {
        throw new Error("Slot already booked");
    }
    // Check if same student already requested
    const existingStudentBooking = await prisma_1.prisma.booking.findFirst({
        where: {
            availabilityId,
            studentId,
            status: {
                in: ["PENDING", "CONFIRMED"],
            },
        },
    });
    if (existingStudentBooking) {
        throw new Error("You already requested this slot");
    }
    // Create booking
    return prisma_1.prisma.booking.create({
        data: {
            studentId,
            tutorId: slot.tutorId,
            availabilityId,
            startTime: slot.startTime,
            endTime: slot.endTime,
            status: "PENDING",
        },
    });
};
// Get student bookings
const getStudentBookings = async (studentId) => {
    return prisma_1.prisma.booking.findMany({
        where: { studentId },
        include: {
            tutor: { select: { id: true, bio: true, pricePerHour: true } },
            availability: true,
        },
        orderBy: { createdAt: "desc" },
    });
};
// Get tutor bookings
const getTutorBookings = async (tutorId) => {
    return prisma_1.prisma.booking.findMany({
        where: { tutorId },
        include: {
            student: { select: { id: true, name: true, email: true } },
            availability: true,
        },
        orderBy: { createdAt: "desc" },
    });
};
// Update booking status
const updateBookingStatus = async (bookingId, status) => {
    return prisma_1.prisma.booking.update({
        where: { id: bookingId },
        data: { status },
    });
};
const getUserBookings = async (userId) => {
    return prisma_1.prisma.booking.findMany({
        where: { studentId: userId },
        include: {
            tutor: {
                include: {
                    user: true,
                    reviews: {
                        where: {
                            studentId: userId,
                        },
                    },
                },
            },
            availability: true,
        },
        orderBy: { createdAt: "desc" },
    });
};
// Mark session as attended
const attendSession = async (studentId, bookingId) => {
    // Validate booking exists
    const booking = await prisma_1.prisma.booking.findUnique({
        where: { id: bookingId },
        select: { studentId: true, status: true },
    });
    if (!booking)
        throw new Error("Booking not found");
    // Check if booking belongs to student
    if (booking.studentId !== studentId) {
        throw new Error("You are not allowed to attend this session");
    }
    // Only CONFIRMED sessions can be attended
    if (booking.status !== enums_1.BookingStatus.CONFIRMED) {
        throw new Error("Only confirmed sessions can be attended");
    }
    // Update status to COMPLETED
    return prisma_1.prisma.booking.update({
        where: { id: bookingId },
        data: { status: enums_1.BookingStatus.ATTEND },
    });
};
exports.BookingService = {
    createBooking,
    getStudentBookings,
    getTutorBookings,
    updateBookingStatus,
    getUserBookings,
    attendSession,
};
