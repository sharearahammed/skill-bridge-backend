import { prisma } from "../../lib/prisma.js";

type UpdateStudentInput = {
  userId: string;
  name?: string;
  email?: string;
  image?: string;
};

export const updateStudent = async ({
  userId,
  name,
  email,
  image,
}: UpdateStudentInput) => {
  if (email) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser && existingUser.id !== userId) {
      throw new Error("Email already in use by another user");
    }
  }

  // Update
  return prisma.user.update({
    where: { id: userId },
    data: {
      ...(name && { name }),
      ...(email && { email }),
      ...(image && { image }),
    },
  });
};

export const StudentService = {
  updateStudent,
};
