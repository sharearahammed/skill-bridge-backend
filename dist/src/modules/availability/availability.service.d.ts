export declare const AvailabilityService: {
    createSlot: (userId: string, input: {
        subjectId: string;
        startTime: string;
        endTime: string;
    }) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: Date;
        endTime: Date;
        tutorId: string;
        subjectId: string;
    }>;
    getSlots: (userId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: Date;
        endTime: Date;
        tutorId: string;
        subjectId: string;
    }[]>;
};
//# sourceMappingURL=availability.service.d.ts.map