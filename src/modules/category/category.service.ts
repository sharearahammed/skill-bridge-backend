import { prisma } from "../../lib/prisma.js";


const createCategory = async (name: string) => {
  return prisma.category.create({
    data: { name },
  });
};

const getCategories = async () => {
  return prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const CategoryService = {
  createCategory,
  getCategories,
};