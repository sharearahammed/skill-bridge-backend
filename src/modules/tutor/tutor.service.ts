import { prisma } from "../../lib/prisma";

const createOrUpdateProfile = async (
  userId: string,
  input: {
    bio?: string;
    pricePerHour: number;
    experience: number;
  }
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

export const TutorService = { createOrUpdateProfile };