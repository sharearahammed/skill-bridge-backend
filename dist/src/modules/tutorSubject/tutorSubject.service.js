"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorSubjectService = void 0;
const prisma_1 = require("../../lib/prisma");
const addSubjects = async (userId, categoryIds) => {
    const tutor = await prisma_1.prisma.tutorProfile.findUnique({
        where: { userId },
    });
    if (!tutor)
        throw new Error("Tutor profile not found");
    const subjectsToAdd = categoryIds.map((id) => ({
        tutorId: tutor.userId,
        categoryId: id,
    }));
    await prisma_1.prisma.tutorSubject.createMany({
        data: subjectsToAdd,
        skipDuplicates: true,
    });
};
const getTutorSubjects = async (userId) => {
    const tutor = await prisma_1.prisma.tutorProfile.findUnique({
        where: { userId },
        include: {
            tutorSubjects: {
                include: {
                    category: true,
                },
            },
        },
    });
    if (!tutor)
        throw new Error("Tutor profile not found");
    return tutor.tutorSubjects.map((ts) => ts.category);
};
exports.TutorSubjectService = { addSubjects, getTutorSubjects };
//# sourceMappingURL=tutorSubject.service.js.map