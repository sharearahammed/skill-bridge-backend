import { prisma } from "../../lib/prisma";
import {
  AvailabilityInput,
  TutorFilters,
  TutorProfileInput,
} from "./tutors.interface";

// Create or update tutor profile
const createOrUpdateProfile = async (
  userId: string,
  input: TutorProfileInput,
) => {
  const existing = await prisma.tutorProfile.findUnique({
    where: { userId },
  });

  if (existing) {
    // update
    return prisma.tutorProfile.update({
      where: { userId },
      data: input,
    });
  }

  // create
  return prisma.tutorProfile.create({
    data: {
      userId,
      ...input,
    },
  });
};

// Get all tutors with optional filters
const getAllTutors = async (filters: TutorFilters) => {
  const where: any = {};

  if (filters.categoryId) where.categoryId = filters.categoryId;
  if (filters.minRating) where.rating = { gte: filters.minRating };
  if (filters.maxRate) where.hourlyRate = { lte: filters.maxRate };

  return prisma.tutorProfile.findMany({
    where,
    include: {
      user: { select: { name: true, image: true } },
      _count: { select: { reviews: true } },
    },
  });
};

// Get single tutor profile with availability and reviews

const getTutorProfile = async (tutorId: string) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: { userId: tutorId },
    include: {
      user: { select: { name: true, image: true } },
      availability: true,
      reviews: { select: { rating: true, comment: true, createdAt: true } },
      _count: { select: { reviews: true } },
    },
  });

  if (!tutor) throw new Error("Tutor not found");
  return tutor;
};

const getTutorProfileIdByUser = async (userId: string) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: { userId }, // User.id
    select: { id: true },
  });
  if (!tutor) throw new Error("Tutor profile not found");
  return tutor.id;
};

const createSlot = async (userId: string, input: AvailabilityInput) => {
  const tutorId = await getTutorProfileIdByUser(userId);
  console.log("tutorId", tutorId);
  return prisma.availability.create({
    data: {
      tutorId,
      startTime: new Date(input.startTime),
      endTime: new Date(input.endTime),
    },
  });
};

const getSlots = async (tutorId: string) => {
  // return prisma.availability.findMany({
  //   where: { tutorId },
  //   orderBy: { startTime: "asc" },
  // });
};

const deleteSlot = async (id: string) => {
  // return prisma.availability.delete({ where: { id } });
};

const updateSlot = async (id: string, input: AvailabilityInput) => {
  // return prisma.availability.update({
  //   where: { id },
  //   data: {
  //     startTime: new Date(input.startTime),
  //     endTime: new Date(input.endTime),
  //   },
  // });
};

export const TutorsService = {
  getAllTutors,
  getTutorProfile,
  createOrUpdateProfile,
  createSlot,
  getSlots,
  deleteSlot,
  updateSlot,
};
