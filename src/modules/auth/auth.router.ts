import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import authMiddleware from "../../lib/middlewares/auth.js";
import { ForgotPasswordController } from "./forgotPassword.controller.js";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/me", authMiddleware(), AuthController.getMe);
router.post("/forgot-password", ForgotPasswordController.sendOtp);
router.post("/verify-otp", ForgotPasswordController.verifyOtp);
router.post("/reset-password", ForgotPasswordController.resetPassword);
export const authRouter: Router = router;
