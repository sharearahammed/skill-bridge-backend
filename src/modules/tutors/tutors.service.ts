// tutors.service.ts

import { prisma } from "../../lib/prisma";

export interface TutorFilters {
  categoryId?: string;
  minRating?: number;
  maxRate?: number;
}

const getAllTutors = async (filters: TutorFilters) => {
  return prisma.tutorProfile.findMany({
    where: {
      ...(filters.categoryId && {
        tutorSubjects: {
          some: { categoryId: filters.categoryId },
        },
      }),
      ...(filters.minRating && { rating: { gte: filters.minRating } }),
      ...(filters.maxRate && { pricePerHour: { lte: filters.maxRate } }),
    },
    include: {
      user: { select: { id: true, name: true, image: true } },
      tutorSubjects: {
        include: { category: { select: { id: true, name: true } } },
      },
      availability: true,
      _count: { select: { reviews: true } },
    },
    orderBy: { rating: "desc" },
  });
};

const getTutorProfile = async (tutorId: string) => {
  console.log("tutorId", tutorId);
  const tutor = await prisma.tutorProfile.findUnique({
    where: { userId: tutorId },
    include: {
      user: { select: { id: true, name: true, image: true } },
      tutorSubjects: {
        include: { category: { select: { id: true, name: true } } },
      },
      availability: true,
      reviews: {
        select: {
          studentId: true,
          rating: true,
          comment: true,
          createdAt: true,
        },
      },
      _count: { select: { reviews: true } },
    },
  });

  if (!tutor) throw new Error("Tutor not found");
  return tutor;
};

export const TutorsService = {
  getAllTutors,
  getTutorProfile,
};
