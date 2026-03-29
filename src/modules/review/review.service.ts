import { prisma } from "../../lib/prisma.js";

const updateTutorAverageRating = async (tutorId: string) => {
  // Get all ratings of this tutor
  const reviews = await prisma.review.findMany({
    where: { tutorId },
    select: { rating: true },
  });

  if (reviews.length === 0) return;

  const avgRating =
    reviews.reduce((sum: any, r: any) => sum + r.rating, 0) / reviews.length;

  await prisma.tutorProfile.update({
    where: { userId: tutorId },
    data: { rating: avgRating },
  });
};

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

  const review = await prisma.review.create({
    data: {
      studentId,
      tutorId,
      categoryId,
      rating,
      comment: comment ?? null,
    },
  });

  // ✅ Update tutorProfile rating
  await updateTutorAverageRating(tutorId);

  return review;
};

// Update review
const updateReview = async (
  studentId: string,
  reviewId: string,
  rating: number,
  comment?: string,
) => {
  // find the review first
  const existingReview = await prisma.review.findUnique({
    where: { id: reviewId },
    select: { tutorId: true },
  });

  if (!existingReview) {
    throw new Error("Review not found or you are not allowed to update it");
  }

  // now update
  const review = await prisma.review.update({
    where: { id: reviewId },
    data: {
      rating,
      comment: comment ?? null,
    },
  });

  await updateTutorAverageRating(existingReview.tutorId);

  return review;
};

// Get reviews of a tutor
const getTutorReviewsByCategory = async (
  tutorId: string,
  categoryId: string,
  page: number = 1,
) => {
  const limit = 5;
  const skip = (page - 1) * limit;

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      where: { tutorId, categoryId },
      include: {
        student: { select: { id: true, name: true, email: true, image: true } },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.review.count({ where: { tutorId, categoryId } }),
  ]);

  return {
    reviews,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
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

const getStudentReview = async (studentId: string, categoryId: string) => {
  return prisma.review.findFirst({
    where: {
      studentId,
      categoryId, // will match only if categoryId is provided
    },
    include: {
      tutor: {
        select: {
          userId: true,
          user: { select: { name: true, email: true, image: true } },
        },
      },
      category: {
        select: { id: true, name: true },
      },
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

export const ReviewService = {
  createReview,
  updateReview,
  getTutorReviewsByCategory,
  getStudentReview,
  getReviewById,
  getTutorReviews,
};
