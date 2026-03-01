import { prisma } from "../../lib/prisma";


const addSubjects = async (userId: string, categoryIds: string[]) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: { userId },
  });

  if (!tutor) throw new Error("Tutor profile not found");

  const data = categoryIds.map((id) => ({
    tutorId: tutor.id,
    categoryId: id,
  }));

  return prisma.tutorSubject.createMany({
    data,
    skipDuplicates: true,
  });
};

export const TutorSubjectService = { addSubjects };