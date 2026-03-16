"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = exports.updateStudent = void 0;
const prisma_1 = require("../../lib/prisma");
const updateStudent = async ({ userId, name, email, image, }) => {
    if (email) {
        const existingUser = await prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser && existingUser.id !== userId) {
            throw new Error("Email already in use by another user");
        }
    }
    // Update
    return prisma_1.prisma.user.update({
        where: { id: userId },
        data: {
            ...(name && { name }),
            ...(email && { email }),
            ...(image && { image }),
        },
    });
};
exports.updateStudent = updateStudent;
exports.StudentService = {
    updateStudent: exports.updateStudent,
};
