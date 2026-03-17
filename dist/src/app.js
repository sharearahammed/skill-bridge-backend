"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_1 = require("better-auth/node");
const auth_1 = require("./lib/auth");
const cors_1 = __importDefault(require("cors"));
const category_route_1 = require("./modules/category/category.route");
const tutor_route_1 = require("./modules/tutor/tutor.route");
const tutorSubject_router_1 = require("./modules/tutorSubject/tutorSubject.router");
const availability_router_1 = require("./modules/availability/availability.router");
const booking_router_1 = require("./modules/booking/booking.router");
const review_route_1 = require("./modules/review/review.route");
const admin_router_1 = require("./modules/admin/admin.router");
const tutors_router_1 = require("./modules/tutors/tutors.router");
const student_route_1 = require("./modules/student profile/student.route");
const app = (0, express_1.default)();
// increase JSON payload limit
app.use(express_1.default.json({ limit: "10mb" })); // 10mb or more
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
app.use((0, cors_1.default)({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true,
}));
app.all("/api/auth/*splat", (0, node_1.toNodeHandler)(auth_1.auth));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/admin", admin_router_1.adminRouter);
app.use("/category", category_route_1.CategoryRouter);
app.use("/tutor", tutor_route_1.tutorRouter);
app.use("/tutorSubject", tutorSubject_router_1.tutorSubjectRouter);
app.use("/slot", availability_router_1.availableRouter);
app.use("/booking", booking_router_1.BookingRouter);
app.use("/review", review_route_1.reviewRouter);
app.use("/allTutors", tutors_router_1.tutorsRouter);
app.use("/student", student_route_1.StudentProfileRouter);
exports.default = app;
