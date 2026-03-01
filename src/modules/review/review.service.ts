import { prisma } from "../../lib/prisma";

// Create a review
const createReview = async (
  studentId: string,
  tutorId: string,
  rating: number,
  comment?: string,
) => {
  // Ensure student booked the tutor
  const booking = await prisma.booking.findFirst({
    where: {
      studentId,
      tutorId,
      status: "COMPLETED",
    },
  });
  if (!booking)
    throw new Error("Cannot review tutor without a completed booking");

  // Prevent duplicate review
  const existing = await prisma.review.findUnique({
    where: { studentId_tutorId: { studentId, tutorId } },
  });
  if (existing) throw new Error("You already reviewed this tutor");

  return prisma.review.create({
    data: { studentId, tutorId, rating, comment: comment ?? null },
  });
};

// Get reviews of a tutor
const getTutorReviews = async (tutorId: string) => {
  return prisma.review.findMany({
    where: { tutorId },
    include: { student: { select: { id: true, name: true } } },
    orderBy: { createdAt: "desc" },
  });
};

export const ReviewService = { createReview, getTutorReviews };
