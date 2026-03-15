import { Request, Response } from "express";
export declare const TutorController: {
    createOrUpdateProfile: (req: Request, res: Response) => Promise<void>;
    createAvailability: (req: Request, res: Response) => Promise<void>;
    getTutorSessions: (req: Request, res: Response) => Promise<void>;
    getTutorReviews: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=tutor.controller.d.ts.map