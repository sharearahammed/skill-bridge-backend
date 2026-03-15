import { BookingStatus } from "../../../generated/prisma/enums";
export declare const BookingService: {
    createBooking: (studentId: string, availabilityId: string) => Promise<{
        status: BookingStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: Date;
        endTime: Date;
        tutorId: string;
        studentId: string;
        availabilityId: string;
    }>;
    getStudentBookings: (studentId: string) => Promise<({
        availability: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            startTime: Date;
            endTime: Date;
            tutorId: string;
            subjectId: string;
        };
        tutor: {
            id: string;
            bio: string | null;
            pricePerHour: number;
        };
    } & {
        status: BookingStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: Date;
        endTime: Date;
        tutorId: string;
        studentId: string;
        availabilityId: string;
    })[]>;
    getTutorBookings: (tutorId: string) => Promise<({
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
            id: string;
            name: string;
            email: string;
        };
    } & {
        status: BookingStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: Date;
        endTime: Date;
        tutorId: string;
        studentId: string;
        availabilityId: string;
    })[]>;
    updateBookingStatus: (bookingId: string, status: BookingStatus) => Promise<{
        status: BookingStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: Date;
        endTime: Date;
        tutorId: string;
        studentId: string;
        availabilityId: string;
    }>;
    getUserBookings: (userId: string) => Promise<({
        availability: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            startTime: Date;
            endTime: Date;
            tutorId: string;
            subjectId: string;
        };
        tutor: {
            reviews: {
                id: string;
                createdAt: Date;
                rating: number;
                updatedAt: Date;
                tutorId: string;
                studentId: string;
                categoryId: string | null;
                comment: string | null;
            }[];
            user: {
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
            id: string;
            createdAt: Date;
            userId: string;
            bio: string | null;
            pricePerHour: number;
            experience: number;
            rating: number;
            updatedAt: Date;
        };
    } & {
        status: BookingStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: Date;
        endTime: Date;
        tutorId: string;
        studentId: string;
        availabilityId: string;
    })[]>;
    attendSession: (studentId: string, bookingId: string) => Promise<{
        status: BookingStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startTime: Date;
        endTime: Date;
        tutorId: string;
        studentId: string;
        availabilityId: string;
    }>;
};
//# sourceMappingURL=booking.service.d.ts.map