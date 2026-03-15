"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const prisma_1 = require("../../lib/prisma");
const updateTutorAverageRating = async (tutorId) => {
    // Get all ratings of this tutor
    const reviews = await prisma_1.prisma.review.findMany({
        where: { tutorId },
        select: { rating: true },
    });
    if (reviews.length === 0)
        return;
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await prisma_1.prisma.tutorProfile.update({
        where: { userId: tutorId },
        data: { rating: avgRating },
    });
};
// Create a review
const createReview = async (studentId, tutorId, categoryId, rating, comment) => {
    const booking = await prisma_1.prisma.booking.findFirst({
        where: {
            studentId,
            tutorId,
            status: "COMPLETED",
        },
    });
    if (!booking) {
        throw new Error("Cannot review tutor without a completed booking");
    }
    const existing = await prisma_1.prisma.review.findFirst({
        where: {
            studentId,
            tutorId,
            categoryId,
        },
    });
    if (existing) {
        throw new Error("You already reviewed this subject for this tutor");
    }
    const review = await prisma_1.prisma.review.create({
        data: {
            studentId,
            tutorId,
            categoryId,
            rating,
            comment: comment ?? null,
        },
    });
    // ✅ Update tutorProfile rating
    await updateTutorAverageRating(tutorId);
    return review;
};
// Update review
const updateReview = async (studentId, reviewId, rating, comment) => {
    // find the review first
    const existingReview = await prisma_1.prisma.review.findUnique({
        where: { id: reviewId },
        select: { tutorId: true },
    });
    if (!existingReview) {
        throw new Error("Review not found or you are not allowed to update it");
    }
    // now update
    const review = await prisma_1.prisma.review.update({
        where: { id: reviewId },
        data: {
            rating,
            comment: comment ?? null,
        },
    });
    await updateTutorAverageRating(existingReview.tutorId);
    return review;
};
// Get reviews of a tutor
const getTutorReviewsByCategory = async (tutorId, categoryId) => {
    return prisma_1.prisma.review.findMany({
        where: {
            tutorId,
            categoryId, // filter by category
        },
        include: {
            student: { select: { id: true, name: true, email: true, image: true } },
        },
        orderBy: { createdAt: "desc" },
    });
};
// Get a single review by reviewId
const getReviewById = async (reviewId) => {
    return prisma_1.prisma.review.findUnique({
        where: {
            id: reviewId,
        },
        include: {
            tutor: {
                select: {
                    userId: true,
                    user: {
                        select: {
                            name: true,
                            email: true,
                            image: true,
                        },
                    },
                },
            },
            category: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
};
const getStudentReview = async (studentId, categoryId) => {
    return prisma_1.prisma.review.findFirst({
        where: {
            studentId,
            categoryId, // will match only if categoryId is provided
        },
        include: {
            tutor: {
                select: {
                    userId: true,
                    user: { select: { name: true, email: true, image: true } },
                },
            },
            category: {
                select: { id: true, name: true },
            },
        },
    });
};
// Get reviews of a tutor
const getTutorReviews = async (tutorId) => {
    return prisma_1.prisma.review.findMany({
        where: { tutorId },
        include: { student: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" },
    });
};
exports.ReviewService = {
    createReview,
    updateReview,
    getTutorReviewsByCategory,
    getStudentReview,
    getReviewById,
    getTutorReviews,
};
//# sourceMappingURL=review.service.js.map