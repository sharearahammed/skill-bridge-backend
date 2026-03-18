import express, { Application } from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import { adminRouter } from "./modules/admin/admin.router.js";
import { CategoryRouter } from "./modules/category/category.route.js";
import { tutorRouter } from "./modules/tutor/tutor.route.js";
import { tutorSubjectRouter } from "./modules/tutorSubject/tutorSubject.router.js";
import { availableRouter } from "./modules/availability/availability.router.js";
import { BookingRouter } from "./modules/booking/booking.router.js";
import { reviewRouter } from "./modules/review/review.route.js";
import { tutorsRouter } from "./modules/tutors/tutors.router.js";
import { StudentProfileRouter } from "./modules/student profile/student.route.js";
import { auth } from "./lib/auth.js";

const app: Application = express();

// increase JSON payload limit
app.use(express.json({ limit: "10mb" })); // 10mb or more
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const allowedOrigins = [
  process.env.APP_URL,
  "http://localhost:3000",
  "https://skill-bridge-backend-fprg.onrender.com",
  "https://skill-bridge-frontend-uk5b.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
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
