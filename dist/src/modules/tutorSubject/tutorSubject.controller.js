"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorSubjectController = void 0;
const tutorSubject_service_1 = require("./tutorSubject.service");
const addSubjects = async (req, res) => {
    const userId = req.user.id;
    const result = await tutorSubject_service_1.TutorSubjectService.addSubjects(userId, req.body.categoryIds);
    res.json({ success: true, data: result });
};
const getSubjects = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res
                .status(400)
                .json({ success: false, message: "userId required" });
        }
        const parsedUserId = Array.isArray(userId) ? userId[0] : userId;
        const subjects = await tutorSubject_service_1.TutorSubjectService.getTutorSubjects(parsedUserId);
        res.json({ success: true, data: subjects });
    }
    catch (err) {
        console.error(err);
        if (err instanceof Error) {
            res.status(500).json({ success: false, message: err.message });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
};
exports.TutorSubjectController = { addSubjects, getSubjects };
//# sourceMappingURL=tutorSubject.controller.js.map