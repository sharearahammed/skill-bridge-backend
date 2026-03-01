import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";


// Create a booking
const createBooking = async (studentId: string, availabilityId: string) => {
  // Check if slot exists
  const slot = await prisma.availability.findUnique({
    where: { id: availabilityId },
  });
  if (!slot) throw new Error("Slot not found");

  // Prevent double booking
  const existingBooking = await prisma.booking.findFirst({
    where: { availabilityId },
  });
  if (existingBooking) throw new Error("Slot already booked");

  return prisma.booking.create({
    data: {
      studentId,
      tutorId: slot.tutorId,
      availabilityId,
      startTime: slot.startTime,
      endTime: slot.endTime,
      status: BookingStatus.CONFIRMED,
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
    orderBy: { startTime: "desc" },
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
    orderBy: { startTime: "desc" },
  });
};

// Update booking status
const updateBookingStatus = async (
  bookingId: string,
  status: BookingStatus
) => {
  return prisma.booking.update({
    where: { id: bookingId },
    data: { status },
  });
};

export const BookingService = {
  createBooking,
  getStudentBookings,
  getTutorBookings,
  updateBookingStatus,
};