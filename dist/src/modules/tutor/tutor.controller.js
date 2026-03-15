"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorController = void 0;
const tutor_service_1 = require("./tutor.service");
const createOrUpdateProfile = async (req, res) => {
    const userId = req.user.id;
    const result = await tutor_service_1.TutorService.createOrUpdateProfile(userId, req.body);
    res.json({ success: true, data: result });
};
const createAvailability = async (req, res) => {
    const userId = req.user.id;
    const slot = await tutor_service_1.TutorService.createAvailability(userId, req.body);
    res.json({ success: true, data: slot });
};
const getTutorSessions = async (req, res) => {
    const userId = req.user.id;
    const sessions = await tutor_service_1.TutorService.getTutorSessions(userId);
    res.json({ success: true, data: sessions });
};
const getTutorReviews = async (req, res) => {
    try {
        let { tutorId, categoryId } = req.params;
        // Handle string[] case if any
        if (Array.isArray(tutorId))
            tutorId = tutorId[0];
        if (Array.isArray(categoryId))
            categoryId = categoryId[0];
        if (!tutorId || !categoryId) {
            return res
                .status(400)
                .json({
                success: false,
                message: "tutorId and categoryId are required",
            });
        }
        const reviews = await tutor_service_1.TutorService.getTutorReviewsByCategory(tutorId, categoryId);
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
exports.TutorController = {
    createOrUpdateProfile,
    createAvailability,
    getTutorSessions,
    getTutorReviews,
};
//# sourceMappingURL=tutor.controller.js.map