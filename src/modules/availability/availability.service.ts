import { prisma } from "../../lib/prisma";


const createSlot = async (
  userId: string,
  input: {
    subjectId: string;
    startTime: string;
    endTime: string;
  }
) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: { userId },
  });

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

const getSlots = async (userId: string) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: { userId },
  });

  if (!tutor) throw new Error("Tutor profile not found");

  return prisma.availability.findMany({
    where: { tutorId: tutor.id },
    orderBy: { startTime: "asc" },
  });
};

export const AvailabilityService = {
  createSlot,
  getSlots,
};