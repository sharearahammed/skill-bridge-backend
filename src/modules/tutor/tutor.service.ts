import { prisma } from "../../lib/prisma";

const createOrUpdateProfile = async (
  userId: string,
  input: {
    bio?: string;
    pricePerHour: number;
    experience: number;
  },
) => {
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
      tutorId: tutor.id,
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
    where: { tutorId: tutor.id },
    include: { student: true, availability: true },
    orderBy: { startTime: "asc" },
  });
};

export const TutorService = {
  createOrUpdateProfile,
  createAvailability,
  getTutorSessions,
};
