import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../../lib/auth.js";

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
        name?: string;
        role: string;
        emailVerified: boolean;
      };
    }
  }
}

const authMiddleware = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get user session from better-auth
      const session = await betterAuth.api.getSession({
        headers: req.headers as any,
      });
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
        role: session.user.role as string,
        emailVerified: session.user.emailVerified,
      };

      if (roles.length && !roles.includes(req.user.role as UserRole)) {
        return res.status(403).json({
          success: false,
          message:
            "Forbidden! You do not have permission to access this resource!",
        });
      }

      console.log("session", session);
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authMiddleware;
