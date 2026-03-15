export declare const TutorService: {
    createOrUpdateProfile: (userId: string, input: {
        name?: string;
        email?: string;
        image?: string;
        bio?: string;
        pricePerHour: number;
        experience: number;
    }) => Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        bio: string | null;
        pricePerHour: number;
        experience: number;
        rating: number;
        updatedAt: Date;
    }>;
    createAvailability: (userId: string, input: any) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: Date;
        endTime: Date;
        tutorId: string;
        subjectId: string;
    }>;
    getTutorSessions: (userId: string) => Promise<({
        availability: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            startTime: Date;
            endTime: Date;
            tutorId: string;
            subjectId: string;
        };
        student: {
            role: import("../../../generated/prisma/enums").UserRole;
            phone: string | null;
            status: import("../../../generated/prisma/enums").UserStatus;
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            image: string | null;
        };
    } & {
        status: import("../../../generated/prisma/enums").BookingStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: Date;
        endTime: Date;
        tutorId: string;
        studentId: string;
        availabilityId: string;
    })[]>;
    getTutorReviewsByCategory: (tutorId: string, categoryId: string) => Promise<({
        student: {
            id: string;
            name: string;
            email: string;
            image: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        rating: number;
        updatedAt: Date;
        tutorId: string;
        studentId: string;
        categoryId: string | null;
        comment: string | null;
    })[]>;
};
//# sourceMappingURL=tutor.service.d.ts.map