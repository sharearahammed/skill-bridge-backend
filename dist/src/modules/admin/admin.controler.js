"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_service_1 = require("./admin.service");
const getAllUsers = async (req, res) => {
    try {
        const users = await admin_service_1.AdminService.getAllUsers();
        res.json({ success: true, data: users });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
const updateUserStatus = async (req, res) => {
    try {
        const idParam = req.params.id;
        // Validate id
        if (!idParam || Array.isArray(idParam)) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid user id" });
        }
        const { status } = req.body;
        const user = await admin_service_1.AdminService.updateUserStatus(idParam, status);
        res.json({ success: true, data: user });
    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
const getAllBookings = async (req, res) => {
    try {
        const bookings = await admin_service_1.AdminService.getAllBookings();
        res.json({ success: true, data: bookings });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
const getAllCategories = async (req, res) => {
    try {
        const categories = await admin_service_1.AdminService.getAllCategories();
        res.json({ success: true, data: categories });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
const createCategory = async (req, res) => {
    try {
        const input = req.body; // { name: string }
        const category = await admin_service_1.AdminService.createCategory(input);
        res.json({ success: true, data: category });
    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
exports.AdminController = {
    getAllUsers,
    getAllCategories,
    createCategory,
    getAllBookings,
    updateUserStatus,
};
