"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const student_service_1 = require("./student.service");
const updateStudent = async (req, res) => {
    try {
        let userId = req.params.userId;
        if (Array.isArray(userId))
            userId = userId[0];
        if (!userId) {
            return res
                .status(400)
                .json({ success: false, message: "userId is required" });
        }
        const { name, email, image } = req.body;
        if (!name && !email && !image) {
            return res
                .status(400)
                .json({ success: false, message: "Nothing to update" });
        }
        const updated = await student_service_1.StudentService.updateStudent({
            userId,
            name,
            email,
            image,
        });
        res.json({ success: true, data: updated });
    }
    catch (error) {
        console.error(error);
        res
            .status(400)
            .json({ success: false, message: error.message || "Internal error" });
    }
};
exports.StudentController = {
    updateStudent,
};
