import { NextFunction, Request, Response } from "express";
export declare enum UserRole {
    STUDENT = "STUDENT",
    TUTOR = "TUTOR",
    ADMIN = "ADMIN"
}
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                name?: string;
                role: string;
                emailVerified: boolean;
            };
        }
    }
}
declare const authMiddleware: (...roles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default authMiddleware;
//# sourceMappingURL=auth.d.ts.map