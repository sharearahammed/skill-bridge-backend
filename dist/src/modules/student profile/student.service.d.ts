type UpdateStudentInput = {
    userId: string;
    name?: string;
    email?: string;
    image?: string;
};
export declare const updateStudent: ({ userId, name, email, image, }: UpdateStudentInput) => Promise<{
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
}>;
export declare const StudentService: {
    updateStudent: ({ userId, name, email, image, }: UpdateStudentInput) => Promise<{
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
    }>;
};
export {};
//# sourceMappingURL=student.service.d.ts.map