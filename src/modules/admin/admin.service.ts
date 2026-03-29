// admin.service.ts

import { prisma } from "../../lib/prisma.js";

// Users
const getAllUsers = (page: number = 1) => {
  const limit = 10;
  const skip = (page - 1) * limit;

  return Promise.all([
    prisma.user.findMany({
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
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count(),
  ]).then(([users, total]) => ({
    users,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  }));
};

const updateUserStatus = (userId: string, status: "ACTIVE" | "BANNED") => {
  return prisma.user.update({
    where: { id: userId },
    data: { status },
  });
};

// Bookings
const getAllBookings = (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;
  return Promise.all([
    prisma.booking.findMany({
      skip,
      take: limit,
      include: {
        student: { select: { id: true, name: true, email: true } },
        tutor: {
          select: { id: true, user: { select: { name: true, email: true } } },
        },
        availability: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.booking.count(),
  ]).then(([data, total]) => ({ data, total }));
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

const deleteCategory = (id: string) => {
  return prisma.category.delete({
    where: { id },
  });
};

export const AdminService = {
  getAllUsers,
  getAllCategories,
  createCategory,
  getAllBookings,
  updateUserStatus,
  deleteCategory,
};
