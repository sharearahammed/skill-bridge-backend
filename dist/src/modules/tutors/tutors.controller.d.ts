import { Request, Response } from "express";
export interface TutorFilters {
    categoryId?: string;
    minRating?: number;
    maxRate?: number;
    search?: string;
}
export declare const TutorsController: {
    getAllTutors: (req: Request, res: Response) => Promise<void>;
    getTutorProfile: (req: Request, res: Response) => Promise<void>;
    getFeaturedTutors: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=tutors.controller.d.ts.map