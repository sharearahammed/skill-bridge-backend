import { prisma } from "../../lib/prisma.js";


const createOrUpdateProfile = async (
  userId: string,
  input: {
    name?: string;
    email?: string;
    image?: string;
    bio?: string;
    pricePerHour: number;
    experience: number;
  },
) => {
  // Prepare user update object dynamically
  const userData: { name?: string; email?: string; image?: string } = {};
  if (input.name) userData.name = input.name;
  if (input.email) userData.email = input.email;
  if (input.image) userData.image = input.image;

  // Update User only if at least one field is provided
  if (Object.keys(userData).length > 0) {
    await prisma.user.update({
      where: { id: userId },
      data: userData,
    });
  }

  // Check if tutor profile exists
  const existing = await prisma.tutorProfile.findUnique({
    where: { userId },
  });

  if (existing) {
    return prisma.tutorProfile.update({
      where: { userId },
      data: {
        bio: input.bio ?? null,
        pricePerHour: input.pricePerHour,
        experience: input.experience,
      },
    });
  }

  return prisma.tutorProfile.create({
    data: {
      user: { connect: { id: userId } },
      bio: input.bio ?? null,
      pricePerHour: input.pricePerHour,
      experience: input.experience,
    },
  });
};

const createAvailability = async (userId: string, input: any) => {
  const tutor = await prisma.tutorProfile.findUnique({ where: { userId } });
  if (!tutor) throw new Error("Tutor profile not found");
  return prisma.availability.create({
    data: {
      tutorId: tutor.userId,
      subjectId: input.subjectId,
      startTime: new Date(input.startTime),
      endTime: new Date(input.endTime),
    },
  });
};

const getTutorSessions = async (userId: string) => {
  const tutor = await prisma.tutorProfile.findUnique({ where: { userId } });
  if (!tutor) throw new Error("Tutor profile not found");
  return prisma.booking.findMany({
    where: { tutorId: tutor.userId },
    include: { student: true, availability: true },
    orderBy: { createdAt: "desc" },
  });
};

const getTutorReviewsByCategory = async (tutorId: string, categoryId: string) => {
  return prisma.review.findMany({
    where: {
      tutorId,
      categoryId,
    },
    include: {
      student: {
        select: { id: true, name: true, email: true, image: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const TutorService = {
  createOrUpdateProfile,
  createAvailability,
  getTutorSessions,
  getTutorReviewsByCategory
};
