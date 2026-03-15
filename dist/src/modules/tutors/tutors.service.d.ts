import { TutorFilters } from "./tutors.controller";
export declare const TutorsService: {
    getAllTutors: (filters: TutorFilters) => Promise<({
        tutorSubjects: ({
            category: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            tutorId: string;
            categoryId: string;
        })[];
        availability: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            startTime: Date;
            endTime: Date;
            tutorId: string;
            subjectId: string;
        }[];
        _count: {
            reviews: number;
        };
        user: {
            id: string;
            name: string;
            image: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        bio: string | null;
        pricePerHour: number;
        experience: number;
        rating: number;
        updatedAt: Date;
    })[]>;
    getTutorProfile: (tutorId: string) => Promise<({
        tutorSubjects: ({
            category: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            tutorId: string;
            categoryId: string;
        })[];
        availability: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            startTime: Date;
            endTime: Date;
            tutorId: string;
            subjectId: string;
        }[];
        reviews: {
            createdAt: Date;
            rating: number;
            studentId: string;
            comment: string | null;
        }[];
        _count: {
            reviews: number;
        };
        user: {
            id: string;
            name: string;
            image: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        bio: string | null;
        pricePerHour: number;
        experience: number;
        rating: number;
        updatedAt: Date;
    }) | null>;
    getFeaturedTutors: () => Promise<{
        id: string;
        bio: string | null;
        rating: number;
        pricePerHour: number;
        user: {
            id: string;
            name: string;
            image: string | null;
        };
        reviews: {
            id: string;
            createdAt: Date;
            rating: number;
            tutorId: string;
            studentId: string;
            comment: string | null;
        }[];
        reviewCount: number;
        category: ({
            category: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            tutorId: string;
            categoryId: string;
        })[];
    }[]>;
};
//# sourceMappingURL=tutors.service.d.ts.map