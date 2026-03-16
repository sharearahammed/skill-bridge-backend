"use strict";
// tutors.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorsService = void 0;
const prisma_1 = require("../../lib/prisma");
const getAllTutors = async (filters) => {
    return prisma_1.prisma.tutorProfile.findMany({
        where: {
            ...(filters.categoryId && {
                tutorSubjects: {
                    some: { categoryId: filters.categoryId },
                },
            }),
            ...(filters.search && {
                tutorSubjects: {
                    some: {
                        category: {
                            name: {
                                contains: filters.search,
                                mode: "insensitive",
                            },
                        },
                    },
                },
            }),
            ...(filters.minRating && {
                rating: { gte: filters.minRating },
            }),
            ...(filters.maxRate && {
                pricePerHour: { lte: filters.maxRate },
            }),
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
            tutorSubjects: {
                include: {
                    category: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
            availability: true,
            _count: {
                select: {
                    reviews: true,
                },
            },
        },
        orderBy: {
            rating: "desc",
        },
    });
};
const getTutorProfile = async (tutorId) => {
    const tutor = await prisma_1.prisma.tutorProfile.findUnique({
        where: { userId: tutorId },
        include: {
            user: { select: { id: true, name: true, image: true } },
            tutorSubjects: {
                include: { category: { select: { id: true, name: true } } },
            },
            availability: true,
            reviews: {
                select: {
                    studentId: true,
                    rating: true,
                    comment: true,
                    createdAt: true,
                },
            },
            _count: { select: { reviews: true } },
        },
    });
    if (!tutor) {
        return null;
    }
    return tutor;
};
const getFeaturedTutors = async () => {
    const tutors = await prisma_1.prisma.tutorProfile.findMany({
        take: 6,
        where: {
            rating: {
                gt: 0,
            },
            user: {
                role: "TUTOR",
                status: "ACTIVE",
            },
        },
        orderBy: {
            rating: "desc",
        },
        include: {
            user: {
                select: { id: true, name: true, image: true },
            },
            tutorSubjects: {
                include: {
                    category: {
                        select: { id: true, name: true },
                    },
                },
            },
            reviews: {
                select: {
                    id: true,
                    studentId: true,
                    tutorId: true,
                    rating: true,
                    comment: true,
                    createdAt: true,
                },
            },
            _count: {
                select: { reviews: true },
            },
        },
    });
    return tutors.map((tutor) => ({
        id: tutor.id,
        bio: tutor.bio,
        rating: tutor.rating,
        pricePerHour: tutor.pricePerHour,
        user: tutor.user,
        reviews: tutor.reviews,
        reviewCount: tutor._count.reviews,
        category: tutor.tutorSubjects,
    }));
};
exports.TutorsService = {
    getAllTutors,
    getTutorProfile,
    getFeaturedTutors,
};
