import express, { Application } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { CategoryRouter } from "./modules/category/category.route";
import { tutorRouter } from "./modules/tutor/tutor.route";
import { tutorSubjectRouter } from "./modules/tutorSubject/tutorSubject.router";
import { availableRouter } from "./modules/availability/availability.router";
import { BookingRouter } from "./modules/booking/booking.router";
import { reviewRouter } from "./modules/review/review.route";
import { adminRouter } from "./modules/aadmin/admin.router";
import { tutorsRouter } from "./modules/tutors/tutors.router";
import { StudentProfileRouter } from "./modules/student profile/student.route";


const app: Application = express();

// increase JSON payload limit
app.use(express.json({ limit: "10mb" })); // 10mb or more
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/admin", adminRouter);
app.use("/category", CategoryRouter);
app.use("/tutor", tutorRouter);
app.use("/tutorSubject", tutorSubjectRouter);
app.use("/slot", availableRouter);
app.use("/booking", BookingRouter);
app.use("/review", reviewRouter);
app.use("/allTutors", tutorsRouter);
app.use("/student", StudentProfileRouter);



export default app;
