"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const prisma_1 = require("./lib/prisma");
const PORT = process.env.PORT || 3000;
async function main() {
    try {
        await prisma_1.prisma.$connect();
        console.log("Connect to the database succcessfully");
        app_1.default.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
        await prisma_1.prisma.$disconnect();
        process.exit(1);
    }
}
main();
//# sourceMappingURL=server.js.map