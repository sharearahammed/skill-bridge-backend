import express, { Application } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { tutorsRouter } from "./modules/Tutors/tutors.router";
import { adminRouter } from "./modules/Admin/admin.router";


const app: Application = express();

app.use(
  cors({
    // origin: process.env.APP_URL || "http://localhost:3000",
    origin: "*",
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/tutors", tutorsRouter);
app.use("/admin", adminRouter);



export default app;
