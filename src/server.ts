import app from "./app.js";
import { prisma } from "./lib/prisma.js";

const PORT = process.env.PORT || 3000;

// Connect to database on startup
prisma
  .$connect()
  .then(() => console.log("Connected to database"))
  .catch((err: any) => console.error("Database connection error:", err));

// For local development
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// For Vercel serverless
export default app;
