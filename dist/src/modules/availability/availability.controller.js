"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityController = void 0;
const availability_service_1 = require("./availability.service");
const createSlot = async (req, res) => {
    const userId = req.user.id;
    const result = await availability_service_1.AvailabilityService.createSlot(userId, req.body);
    res.json({ success: true, data: result });
};
const getSlots = async (req, res) => {
    const userId = req.user.id;
    const result = await availability_service_1.AvailabilityService.getSlots(userId);
    res.json({ success: true, data: result });
};
exports.AvailabilityController = {
    createSlot,
    getSlots,
};
//# sourceMappingURL=availability.controller.js.map