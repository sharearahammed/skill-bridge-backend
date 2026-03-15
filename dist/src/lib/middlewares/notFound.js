"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = notFound;
function notFound(req, res) {
    res.status(404).json({
        message: "Not Found",
        path: req.originalUrl,
        date: Date(),
    });
}
//# sourceMappingURL=notFound.js.map