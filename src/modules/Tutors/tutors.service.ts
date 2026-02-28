import { prisma } from "../../lib/prisma";
import { TutorFilters } from "./tutors.interface";

export const TutorsService = {
    // Get all tutors with optional filters
  async getAllTutors(filters: TutorFilters) {
    const where: any = { };

    if (filters.categoryId) where.categoryId = filters.categoryId;
    if (filters.minRating) where.rating = { gte: filters.minRating };
    if (filters.maxRate) where.hourlyRate = { lte: filters.maxRate };

    const tutors = await prisma.user.findMany({
      where,
      include: {
        user: true,
      },
    });

    return tutors;
  },
}