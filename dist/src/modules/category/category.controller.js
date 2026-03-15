"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_service_1 = require("./category.service");
const createCategory = async (req, res) => {
    const result = await category_service_1.CategoryService.createCategory(req.body.name);
    res.json({ success: true, data: result });
};
const getCategories = async (req, res) => {
    const result = await category_service_1.CategoryService.getCategories();
    res.json({ success: true, data: result });
};
exports.CategoryController = {
    createCategory,
    getCategories,
};
//# sourceMappingURL=category.controller.js.map