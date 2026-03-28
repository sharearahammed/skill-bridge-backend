// import express, { Application } from "express";
// import { toNodeHandler } from "better-auth/node";
// import cors from "cors";
// import { adminRouter } from "./modules/admin/admin.router.js";
// import { CategoryRouter } from "./modules/category/category.route.js";
// import { tutorRouter } from "./modules/tutor/tutor.route.js";
// import { tutorSubjectRouter } from "./modules/tutorSubject/tutorSubject.router.js";
// import { availableRouter } from "./modules/availability/availability.router.js";
// import { BookingRouter } from "./modules/booking/booking.router.js";
// import { reviewRouter } from "./modules/review/review.route.js";
// import { tutorsRouter } from "./modules/tutors/tutors.router.js";
// import { StudentProfileRouter } from "./modules/student profile/student.route.js";
// import { auth } from "./lib/auth.js";

// const app: Application = express();

// // increase JSON payload limit
// app.use(express.json({ limit: "10mb" })); // 10mb or more
// app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// const allowedOrigins: string[] = [
//   process.env.APP_URL,
//   "http://localhost:3000",
//   "http://localhost:4000",
//   "https://skill-bridge-frontend-uk5b.onrender.com",
//   "https://skill-bridge-10.netlify.app",
// ].filter((o): o is string => Boolean(o));

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       console.log("Request Origin:", origin);

//       // allow requests with no origin (like server-to-server)
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }

//       console.error("Blocked by CORS:", origin);
//       return callback(new Error("CORS not allowed"));
//     },
//     credentials: true,
//   }),
// );

// app.all("/api/auth/*splat", toNodeHandler(auth));

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.use("/admin", adminRouter);
// app.use("/category", CategoryRouter);
// app.use("/tutor", tutorRouter);
// app.use("/tutorSubject", tutorSubjectRouter);
// app.use("/slot", availableRouter);
// app.use("/booking", BookingRouter);
// app.use("/review", reviewRouter);
// app.use("/allTutors", tutorsRouter);
// app.use("/student", StudentProfileRouter);

// export default app;

import express, { Application } from "express";
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
import { authRouter } from "./modules/auth/auth.router.js";


const app: Application = express();

// increase JSON payload limit
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const allowedOrigins: string[] = [
  process.env.APP_URL,
  "http://localhost:3000",
  "http://localhost:4000",
  "https://skill-bridge-frontend-uk5b.onrender.com",
  "https://skill-bridge-10.netlify.app",
].filter((o): o is string => Boolean(o));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      console.error("Blocked by CORS:", origin);
      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRouter);
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
