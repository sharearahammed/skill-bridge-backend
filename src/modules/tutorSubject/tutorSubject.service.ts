import { prisma } from "../../lib/prisma";

const addSubjects = async (userId: string, categoryIds: string[]) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: { userId },
  });
  console.log("tutor", tutor);
  if (!tutor) throw new Error("Tutor profile not found");

const subjectsToAdd = categoryIds.map((id: string) => ({
  tutorId: tutor.userId, // ✅ use userId, not id
  categoryId: id,
}));

await prisma.tutorSubject.createMany({
  data: subjectsToAdd,
  skipDuplicates: true,
});

};

export const TutorSubjectService = { addSubjects };
