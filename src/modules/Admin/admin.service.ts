// admin.service.ts

import { prisma } from "../../lib/prisma";

// Users
const getAllUsers = () => {
  return prisma.user.findMany({
    select: {
      id: true,
      image: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const updateUserStatus = (userId: string, status: "ACTIVE" | "BANNED") => {
  return prisma.user.update({
    where: { id: userId },
    data: { status },
  });
};

// Bookings
const getAllBookings = () => {
  return prisma.booking.findMany({
    include: {
      student: { select: { id: true, name: true, email: true } },
      tutor: {
        select: { id: true, user: { select: { name: true, email: true } } },
      },
      availability: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

// Categories
const getAllCategories = () => {
  return prisma.category.findMany();
};

const createCategory = (input: { name: string }) => {
  return prisma.category.create({
    data: input,
  });
};

export const AdminService = {
  getAllUsers,
  getAllCategories,
  createCategory,
  getAllBookings,
  updateUserStatus,
};
