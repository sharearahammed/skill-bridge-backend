"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const prisma_1 = require("../../lib/prisma");
const createCategory = async (name) => {
    return prisma_1.prisma.category.create({
        data: { name },
    });
};
const getCategories = async () => {
    return prisma_1.prisma.category.findMany({
        orderBy: { createdAt: "desc" },
    });
};
exports.CategoryService = {
    createCategory,
    getCategories,
};
//# sourceMappingURL=category.service.js.map