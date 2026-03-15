export declare const ReviewService: {
    createReview: (studentId: string, tutorId: string, categoryId: string, rating: number, comment?: string) => Promise<{
        id: string;
        createdAt: Date;
        rating: number;
        updatedAt: Date;
        tutorId: string;
        studentId: string;
        categoryId: string | null;
        comment: string | null;
    }>;
    updateReview: (studentId: string, reviewId: string, rating: number, comment?: string) => Promise<{
        id: string;
        createdAt: Date;
        rating: number;
        updatedAt: Date;
        tutorId: string;
        studentId: string;
        categoryId: string | null;
        comment: string | null;
    }>;
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
    getStudentReview: (studentId: string, categoryId: string) => Promise<({
        category: {
            id: string;
            name: string;
        } | null;
        tutor: {
            userId: string;
            user: {
                name: string;
                email: string;
                image: string | null;
            };
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
    }) | null>;
    getReviewById: (reviewId: string) => Promise<({
        category: {
            id: string;
            name: string;
        } | null;
        tutor: {
            userId: string;
            user: {
                name: string;
                email: string;
                image: string | null;
            };
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
    }) | null>;
    getTutorReviews: (tutorId: string) => Promise<({
        student: {
            id: string;
            name: string;
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
//# sourceMappingURL=review.service.d.ts.map