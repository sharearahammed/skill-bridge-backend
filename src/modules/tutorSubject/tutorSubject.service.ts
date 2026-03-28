import { prisma } from "../../lib/prisma.js";

const addSubjects = async (userId: string, categoryIds: string[]) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: { userId },
  });

  if (!tutor) throw new Error("Please create your profile first");

  const subjectsToAdd = categoryIds.map((id: string) => ({
    tutorId: tutor.userId,
    categoryId: id,
  }));

  await prisma.tutorSubject.createMany({
    data: subjectsToAdd,
    skipDuplicates: true,
  });
};

const getTutorSubjects = async (userId: string) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: { userId },
    include: {
      tutorSubjects: {
        include: {
          category: true,
        },
      },
    },
  });

  if (!tutor) throw new Error("Tutor profile not found");

  return tutor.tutorSubjects.map((ts: any) => ts.category);
};

export const TutorSubjectService = { addSubjects, getTutorSubjects };
