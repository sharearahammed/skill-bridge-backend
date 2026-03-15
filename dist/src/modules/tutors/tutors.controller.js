"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorsController = void 0;
const tutors_service_1 = require("./tutors.service");
// Get all tutors with optional filters
const getAllTutors = async (req, res) => {
    try {
        const filters = {};
        const { categoryId, minRating, maxRate, search } = req.query;
        if (categoryId && typeof categoryId === "string") {
            filters.categoryId = categoryId;
        }
        if (minRating && typeof minRating === "string") {
            const rating = Number(minRating);
            if (!isNaN(rating))
                filters.minRating = rating;
        }
        if (maxRate && typeof maxRate === "string") {
            const rate = Number(maxRate);
            if (!isNaN(rate))
                filters.maxRate = rate;
        }
        if (search && typeof search === "string") {
            filters.search = search;
        }
        const tutors = await tutors_service_1.TutorsService.getAllTutors(filters);
        res.json({
            success: true,
            count: tutors.length,
            data: tutors,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
// Get tutor profile by id
const getTutorProfile = async (req, res) => {
    try {
        const tutorId = String(req.params.id);
        const tutor = await tutors_service_1.TutorsService.getTutorProfile(tutorId);
        res.json({ success: true, data: tutor });
    }
    catch (err) {
        res.status(404).json({ success: false, message: err.message });
    }
};
const getFeaturedTutors = async (req, res) => {
    const tutors = await tutors_service_1.TutorsService.getFeaturedTutors();
    res.json({ success: true, data: tutors });
};
exports.TutorsController = {
    getAllTutors,
    getTutorProfile,
    getFeaturedTutors,
};
//# sourceMappingURL=tutors.controller.js.map