import { Request, Response } from "express";
import { ForgotPasswordService } from "./forgotPassword.service.js";

const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    await ForgotPasswordService.sendForgotPasswordOtp(email);
    res.json({ success: true, message: "OTP sent to your email" });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Email and OTP are required" });
    }
    await ForgotPasswordService.verifyOtp(email, otp);
    res.json({ success: true, message: "OTP verified successfully" });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP and new password are required",
      });
    }
    await ForgotPasswordService.resetPassword(email, otp, newPassword);
    res.json({ success: true, message: "Password reset successfully" });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const ForgotPasswordController = { sendOtp, verifyOtp, resetPassword };