export declare const AdminService: {
    getAllUsers: () => import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        role: import("../../../generated/prisma/enums").UserRole;
        status: import("../../../generated/prisma/enums").UserStatus;
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        image: string | null;
    }[]>;
    getAllCategories: () => import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        id: string;
        name: string;
        createdAt: Date;
    }[]>;
    createCategory: (input: {
        name: string;
    }) => import("../../../generated/prisma/models").Prisma__CategoryClient<{
        id: string;
        name: string;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    getAllBookings: () => import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<({
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
            user: {
                name: string;
                email: string;
            };
        };
        student: {
            id: string;
            name: string;
            email: string;
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
    updateUserStatus: (userId: string, status: "ACTIVE" | "BANNED") => import("../../../generated/prisma/models").Prisma__UserClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
};
//# sourceMappingURL=admin.service.d.ts.map