"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorService = void 0;
const prisma_1 = require("../../lib/prisma");
const createOrUpdateProfile = async (userId, input) => {
    // Prepare user update object dynamically
    const userData = {};
    if (input.name)
        userData.name = input.name;
    if (input.email)
        userData.email = input.email;
    if (input.image)
        userData.image = input.image;
    // Update User only if at least one field is provided
    if (Object.keys(userData).length > 0) {
        await prisma_1.prisma.user.update({
            where: { id: userId },
            data: userData,
        });
    }
    // Check if tutor profile exists
    const existing = await prisma_1.prisma.tutorProfile.findUnique({
        where: { userId },
    });
    if (existing) {
        return prisma_1.prisma.tutorProfile.update({
            where: { userId },
            data: {
                bio: input.bio ?? null,
                pricePerHour: input.pricePerHour,
                experience: input.experience,
            },
        });
    }
    return prisma_1.prisma.tutorProfile.create({
        data: {
            user: { connect: { id: userId } },
            bio: input.bio ?? null,
            pricePerHour: input.pricePerHour,
            experience: input.experience,
        },
    });
};
const createAvailability = async (userId, input) => {
    const tutor = await prisma_1.prisma.tutorProfile.findUnique({ where: { userId } });
    if (!tutor)
        throw new Error("Tutor profile not found");
    return prisma_1.prisma.availability.create({
        data: {
            tutorId: tutor.userId,
            subjectId: input.subjectId,
            startTime: new Date(input.startTime),
            endTime: new Date(input.endTime),
        },
    });
};
const getTutorSessions = async (userId) => {
    const tutor = await prisma_1.prisma.tutorProfile.findUnique({ where: { userId } });
    if (!tutor)
        throw new Error("Tutor profile not found");
    return prisma_1.prisma.booking.findMany({
        where: { tutorId: tutor.userId },
        include: { student: true, availability: true },
        orderBy: { createdAt: "desc" },
    });
};
const getTutorReviewsByCategory = async (tutorId, categoryId) => {
    return prisma_1.prisma.review.findMany({
        where: {
            tutorId,
            categoryId,
        },
        include: {
            student: {
                select: { id: true, name: true, email: true, image: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });
};
exports.TutorService = {
    createOrUpdateProfile,
    createAvailability,
    getTutorSessions,
    getTutorReviewsByCategory
};
