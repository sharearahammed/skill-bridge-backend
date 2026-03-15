"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutorsRouter = void 0;
// tutors.router.ts
const express_1 = require("express");
const tutors_controller_1 = require("./tutors.controller");
const router = (0, express_1.Router)();
// Public browsing - students can view tutors without login
// GET /allTutors?categoryId=xxx&minRating=4&maxRate=500
router.get("/", tutors_controller_1.TutorsController.getAllTutors);
router.get("/:id", tutors_controller_1.TutorsController.getTutorProfile);
router.get("/featured/tutor", tutors_controller_1.TutorsController.getFeaturedTutors);
exports.tutorsRouter = router;
//# sourceMappingURL=tutors.router.js.map