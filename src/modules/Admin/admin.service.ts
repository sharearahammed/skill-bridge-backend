import { prisma } from "../../lib/prisma";
import { AvailabilityInput } from "../Tutors/tutors.interface";

export interface CategoryInput {
  name: string;
}

const createCategory = async (inputs: CategoryInput[]) => {
  return prisma.category.createMany({
    data: inputs,
    skipDuplicates: true,
  });
};

const getAllCategories = async () => {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
  });
};



export const CategoriesService = {
  createCategory,
  getAllCategories,
};
