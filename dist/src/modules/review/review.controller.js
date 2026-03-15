"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const review_service_1 = require("./review.service");
// Student add review
const createReview = async (req, res) => {
    const studentId = req.user.id;
    const { tutorId, categoryId, rating, comment } = req.body;
    try {
        const review = await review_service_1.ReviewService.createReview(studentId, tutorId, categoryId, rating, comment);
        res.json({
            success: true,
            data: review,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({
                success: false,
                message: err.message,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: "Something went wrong",
            });
        }
    }
};
// update review
const updateReview = async (req, res) => {
    const studentId = req.user.id;
    const reviewIdParam = req.params.reviewId;
    if (!reviewIdParam || Array.isArray(reviewIdParam)) {
        return res.status(400).json({
            success: false,
            message: "Invalid review id",
        });
    }
    const reviewId = reviewIdParam;
    const { rating, comment } = req.body;
    try {
        const review = await review_service_1.ReviewService.updateReview(studentId, reviewId, rating, comment);
        res.json({
            success: true,
            message: "Review updated successfully",
            data: review,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({
                success: false,
                message: err.message,
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: "Something went wrong",
            });
        }
    }
};
// Get all reviews of a tutor
const getTutorReviewsByCategory = async (req, res) => {
    try {
        let { tutorId, categoryId } = req.params;
        // Validate undefined
        if (!tutorId || !categoryId) {
            return res.status(400).json({
                success: false,
                message: "tutorId and categoryId are required",
            });
        }
        // Handle array case if someone sends multiple params
        if (Array.isArray(tutorId))
            tutorId = tutorId[0];
        if (Array.isArray(categoryId))
            categoryId = categoryId[0];
        // Explicitly assert as string so TS knows it's not undefined
        const parsedTutorId = tutorId;
        const parsedCategoryId = categoryId;
        const reviews = await review_service_1.ReviewService.getTutorReviewsByCategory(parsedTutorId, parsedCategoryId);
        res.json({ success: true, data: reviews });
    }
    catch (err) {
        console.error(err);
        if (err instanceof Error) {
            res.status(500).json({ success: false, message: err.message });
        }
        else {
            res
                .status(500)
                .json({ success: false, message: "Internal server error" });
        }
    }
};
// Get a review by student and category
const getStudentReview = async (req, res) => {
    try {
        const { studentId, categoryId } = req.query;
        if (!studentId || !categoryId)
            return res
                .status(400)
                .json({ message: "studentId and categoryId are required" });
        const review = await review_service_1.ReviewService.getStudentReview(studentId, categoryId);
        return res.status(200).json({ data: review });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: error.message || "Something went wrong" });
    }
};
// Get single review by reviewId
const getReviewById = async (req, res) => {
    try {
        const reviewId = req.params.id;
        console.log({ reviewId });
        if (!reviewId || typeof reviewId !== "string") {
            return res.status(400).json({
                success: false,
                message: "Invalid review id",
            });
        }
        const review = await review_service_1.ReviewService.getReviewById(reviewId);
        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Review retrieved successfully",
            data: review,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to retrieve review",
        });
    }
};
const getTutorReviews = async (req, res) => {
    const tutorId = req.params.tutorId;
    const reviews = await review_service_1.ReviewService.getTutorReviews(tutorId);
    res.json({ success: true, data: reviews });
};
exports.ReviewController = {
    createReview,
    updateReview,
    getTutorReviewsByCategory,
    getStudentReview,
    getReviewById,
    getTutorReviews,
};
//# sourceMappingURL=review.controller.js.map