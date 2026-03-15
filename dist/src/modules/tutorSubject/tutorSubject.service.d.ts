export declare const TutorSubjectService: {
    addSubjects: (userId: string, categoryIds: string[]) => Promise<void>;
    getTutorSubjects: (userId: string) => Promise<{
        id: string;
        name: string;
        createdAt: Date;
    }[]>;
};
//# sourceMappingURL=tutorSubject.service.d.ts.map