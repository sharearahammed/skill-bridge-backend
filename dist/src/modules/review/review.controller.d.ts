import { Request, Response } from "express";
export declare const ReviewController: {
    createReview: (req: Request, res: Response) => Promise<void>;
    updateReview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getTutorReviewsByCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getStudentReview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getReviewById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getTutorReviews: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=review.controller.d.ts.map