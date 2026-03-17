"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentProfileRouter = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student.controller");
const router = express_1.default.Router();
// Update student info (name & image)
router.patch("/:userId", student_controller_1.StudentController.updateStudent);
exports.StudentProfileRouter = router;
