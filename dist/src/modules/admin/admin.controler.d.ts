import { Request, Response } from "express";
export declare const AdminController: {
    getAllUsers: (req: Request, res: Response) => Promise<void>;
    getAllCategories: (req: Request, res: Response) => Promise<void>;
    createCategory: (req: Request, res: Response) => Promise<void>;
    getAllBookings: (req: Request, res: Response) => Promise<void>;
    updateUserStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=admin.controler.d.ts.map