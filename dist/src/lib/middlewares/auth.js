"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
const auth_1 = require("../../lib/auth");
var UserRole;
(function (UserRole) {
    UserRole["STUDENT"] = "STUDENT";
    UserRole["TUTOR"] = "TUTOR";
    UserRole["ADMIN"] = "ADMIN";
})(UserRole || (exports.UserRole = UserRole = {}));
const authMiddleware = (...roles) => {
    console.log(roles);
    return async (req, res, next) => {
        try {
            //get user session from better-auth
            const session = await auth_1.auth.api.getSession({
                headers: req.headers,
            });
            console.log(session);
            if (!session || !session.user) {
                return res
                    .status(401)
                    .json({ success: false, message: "Unauthorized" });
            }
            // if (!session.user.emailVerified) {
            //   return res.status(403).json({
            //     success: false,
            //     message: "Email Verification Required.Please verify your email!",
            //   });
            // }
            // Check user status
            if (session.user.status !== "ACTIVE") {
                return res.status(403).json({
                    success: false,
                    message: "Your account is not active. Contact admin.",
                });
            }
            req.user = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
                role: session.user.role,
                emailVerified: session.user.emailVerified,
            };
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden! You do not have permission to access this resource!",
                });
            }
            console.log("session", session);
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.js.map