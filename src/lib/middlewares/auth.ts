// import { NextFunction, Request, Response } from "express";
// import { auth as betterAuth } from "../../lib/auth.js";

// export enum UserRole {
//   STUDENT = "STUDENT",
//   TUTOR = "TUTOR",
//   ADMIN = "ADMIN",
// }

// declare global {
//   namespace Express {
//     interface Request {
//       user?: {
//         id: string;
//         email: string;
//         name?: string;
//         role: string;
//         emailVerified: boolean;
//       };
//     }
//   }
// }

// const authMiddleware = (...roles: UserRole[]) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       //get user session from better-auth
//       const session = await betterAuth.api.getSession({
//         headers: req.headers as any,
//       });
//       if (!session || !session.user) {
//         return res
//           .status(401)
//           .json({ success: false, message: "Unauthorized" });
//       }

//       // if (!session.user.emailVerified) {
//       //   return res.status(403).json({
//       //     success: false,
//       //     message: "Email Verification Required.Please verify your email!",
//       //   });
//       // }

//       // Check user status
//       if (session.user.status !== "ACTIVE") {
//         return res.status(403).json({
//           success: false,
//           message: "Your account is not active. Contact admin.",
//         });
//       }

//       req.user = {
//         id: session.user.id,
//         email: session.user.email,
//         name: session.user.name,
//         role: session.user.role as string,
//         emailVerified: session.user.emailVerified,
//       };

//       if (roles.length && !roles.includes(req.user.role as UserRole)) {
//         return res.status(403).json({
//           success: false,
//           message:
//             "Forbidden! You do not have permission to access this resource!",
//         });
//       }

//       console.log("session", session);
//       console.log("Origin:", req.headers.origin);
//       next();
//     } catch (error) {
//       next(error);
//     }
//   };
// };

// export default authMiddleware;

import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../auth.js";

export enum UserRole {
  STUDENT = "STUDENT",
  TUTOR = "TUTOR",
  ADMIN = "ADMIN",
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
        status: string;
      };
    }
  }
}

const authMiddleware = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized: No token provided" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = verifyToken(token);

      if (decoded.status !== "ACTIVE") {
        return res.status(403).json({
          success: false,
          message: "Your account is not active. Contact admin.",
        });
      }

      req.user = {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
        status: decoded.status,
      };

      if (roles.length && !roles.includes(req.user.role as UserRole)) {
        return res.status(403).json({
          success: false,
          message:
            "Forbidden! You do not have permission to access this resource!",
        });
      }

      next();
    } catch (error: any) {
      if (
        error.name === "JsonWebTokenError" ||
        error.name === "TokenExpiredError"
      ) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized: Invalid token" });
      }
      next(error);
    }
  };
};

export default authMiddleware;
