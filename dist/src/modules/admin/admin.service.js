"use strict";
// admin.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const prisma_1 = require("../../lib/prisma");
// Users
const getAllUsers = () => {
    return prisma_1.prisma.user.findMany({
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
const updateUserStatus = (userId, status) => {
    return prisma_1.prisma.user.update({
        where: { id: userId },
        data: { status },
    });
};
// Bookings
const getAllBookings = () => {
    return prisma_1.prisma.booking.findMany({
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
    return prisma_1.prisma.category.findMany();
};
const createCategory = (input) => {
    return prisma_1.prisma.category.create({
        data: input,
    });
};
exports.AdminService = {
    getAllUsers,
    getAllCategories,
    createCategory,
    getAllBookings,
    updateUserStatus,
};
