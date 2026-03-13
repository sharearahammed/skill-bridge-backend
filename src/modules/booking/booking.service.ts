import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

// Create a booking
const createBooking = async (studentId: string, availabilityId: string) => {
  // Check slot exists
  const slot = await prisma.availability.findUnique({
    where: { id: availabilityId },
  });

  if (!slot) throw new Error("Slot not found");

  // Check if slot already confirmed by someone
  const confirmedBooking = await prisma.booking.findFirst({
    where: {
      availabilityId,
      status: "CONFIRMED",
    },
  });

  if (confirmedBooking) {
    throw new Error("Slot already booked");
  }

  // Check if same student already requested
  const existingStudentBooking = await prisma.booking.findFirst({
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
  return prisma.booking.create({
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
const getStudentBookings = async (studentId: string) => {
  return prisma.booking.findMany({
    where: { studentId },
    include: {
      tutor: { select: { id: true, bio: true, pricePerHour: true } },
      availability: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

// Get tutor bookings
const getTutorBookings = async (tutorId: string) => {
  return prisma.booking.findMany({
    where: { tutorId },
    include: {
      student: { select: { id: true, name: true, email: true } },
      availability: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

// Update booking status
const updateBookingStatus = async (
  bookingId: string,
  status: BookingStatus,
) => {
  return prisma.booking.update({
    where: { id: bookingId },
    data: { status },
  });
};

const getUserBookings = async (userId: string) => {
  return prisma.booking.findMany({
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

export const BookingService = {
  createBooking,
  getStudentBookings,
  getTutorBookings,
  updateBookingStatus,
  getUserBookings,
};
