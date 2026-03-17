"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityService = void 0;
const prisma_1 = require("../../lib/prisma");
const createSlot = async (userId, input) => {
    const tutor = await prisma_1.prisma.tutorProfile.findUnique({
        where: { userId },
    });
    if (!tutor)
        throw new Error("Tutor profile not found");
    console.log({ tutor });
    return prisma_1.prisma.availability.create({
        data: {
            tutorId: tutor.userId,
            subjectId: input.subjectId,
            startTime: new Date(input.startTime),
            endTime: new Date(input.endTime),
        },
    });
};
const getSlots = async (userId) => {
    const tutor = await prisma_1.prisma.tutorProfile.findUnique({
        where: { userId },
    });
    if (!tutor)
        throw new Error("Tutor profile not found");
    return prisma_1.prisma.availability.findMany({
        where: { tutorId: tutor.userId },
        orderBy: { createdAt: "desc" },
    });
};
exports.AvailabilityService = {
    createSlot,
    getSlots,
};
