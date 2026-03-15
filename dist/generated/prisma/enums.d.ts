export declare const BookingStatus: {
    readonly PENDING: "PENDING";
    readonly CONFIRMED: "CONFIRMED";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
    readonly ATTEND: "ATTEND";
};
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
export declare const UserRole: {
    readonly STUDENT: "STUDENT";
    readonly TUTOR: "TUTOR";
    readonly ADMIN: "ADMIN";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly BANNED: "BANNED";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
//# sourceMappingURL=enums.d.ts.map