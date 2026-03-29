import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const sendForgotPasswordOtp = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("No account found with this email");
  }

  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await prisma.user.update({
    where: { email },
    data: {
      resetOtp: otp,
      resetOtpExpiresAt: expiresAt,
    },
  });

  await transporter.sendMail({
    from: `"Skill Bridge" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Password Reset OTP",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 30px; border-radius: 10px; background: #f9f9f9;">
        <h2 style="color: #00B5BA;">Skill Bridge</h2>
        <p>You requested a password reset. Use the OTP below:</p>
        <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #00B5BA; text-align: center; padding: 20px;">
          ${otp}
        </div>
        <p style="color: #888;">This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone.</p>
        <p style="color: #888;">If you did not request this, please ignore this email.</p>
      </div>
    `,
  });
};

const verifyOtp = async (email: string, otp: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.resetOtp || !user.resetOtpExpiresAt) {
    throw new Error("Invalid or expired OTP");
  }

  if (user.resetOtp !== otp) {
    throw new Error("Invalid OTP");
  }

  if (new Date() > user.resetOtpExpiresAt) {
    throw new Error("OTP has expired. Please request a new one");
  }
};

const resetPassword = async (
  email: string,
  otp: string,
  newPassword: string,
) => {
  await verifyOtp(email, otp);

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { email },
    data: {
      password: hashedPassword,
      resetOtp: null,
      resetOtpExpiresAt: null,
    },
  });
};

export const ForgotPasswordService = {
  sendForgotPasswordOtp,
  verifyOtp,
  resetPassword,
};