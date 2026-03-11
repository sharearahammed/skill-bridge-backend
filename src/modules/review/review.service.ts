import { prisma } from "../../lib/prisma";

// Create a review
const createReview = async (
  studentId: string,
  tutorId: string,
  categoryId: string,
  rating: number,
  comment?: string,
) => {
  const booking = await prisma.booking.findFirst({
    where: {
      studentId,
      tutorId,
      status: "COMPLETED",
    },
  });

  if (!booking) {
    throw new Error("Cannot review tutor without a completed booking");
  }

  const existing = await prisma.review.findFirst({
    where: {
      studentId,
      tutorId,
      categoryId,
    },
  });

  if (existing) {
    throw new Error("You already reviewed this subject for this tutor");
  }

  return prisma.review.create({
    data: {
      studentId,
      tutorId,
      categoryId,
      rating,
      comment: comment ?? null,
    },
  });
};

// Update review
const updateReview = async (
  studentId: string,
  reviewId: string,
  rating: number,
  comment?: string,
) => {
  return prisma.review.updateMany({
    where: {
      id: reviewId,
      studentId,
    },
    data: {
      rating,
      comment: comment || null,
    },
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

// Get a single review by reviewId
const getReviewById = async (reviewId: string) => {
  return prisma.review.findUnique({
    where: {
      id: reviewId,
    },
    include: {
      tutor: {
        select: {
          userId: true,
          user: {
            select: {
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const ReviewService = {
  createReview,
  updateReview,
  getTutorReviews,
  // getStudentReview,
  getReviewById
};
