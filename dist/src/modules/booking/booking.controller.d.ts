import { Request, Response } from "express";
export declare const BookingController: {
    createBooking: (req: Request, res: Response) => Promise<void>;
    getStudentBookings: (req: Request, res: Response) => Promise<void>;
    getTutorBookings: (req: Request, res: Response) => Promise<void>;
    updateBookingStatus: (req: Request, res: Response) => Promise<void>;
    myBookings: (req: Request, res: Response) => Promise<void>;
    attendSessionController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=booking.controller.d.ts.map