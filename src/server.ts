import app from "./app";
import { prisma } from "./lib/prisma";

const PORT = process.env.PORT || 3000;

// Connect to database on startup
prisma
  .$connect()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Database connection error:", err));

// For local development
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// For Vercel serverless
export default app;
