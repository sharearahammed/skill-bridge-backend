"use strict";
// import app from "./app";
// import { prisma } from "./lib/prisma";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const app_1 = __importDefault(require("./app"));
const prisma_1 = require("./lib/prisma");
async function init() {
    try {
        await prisma_1.prisma.$connect();
        console.log("Database connected");
    }
    catch (error) {
        console.error("Database connection error:", error);
    }
}
init();
exports.default = app_1.default;
