// import app from "./app";
// import { prisma } from "./lib/prisma";

// const PORT = process.env.PORT || 3000;

// async function main() {
//   try {
//     await prisma.$connect();
//     console.log("Connect to the database succcessfully");
//     app.listen(PORT, () => {
//       console.log(`Server is running on http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.log(error);
//     await prisma.$disconnect();
//     process.exit(1);
//   }
// }

// main();

import app from "./app";
import { prisma } from "./lib/prisma";

async function init() {
  try {
    await prisma.$connect();
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

init();

export default app;
