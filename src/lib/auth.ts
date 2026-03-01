import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // Use true for port 465, false for port 587
//   auth: {
//     user: process.env.APP_USER,
//     pass: process.env.APP_PASS,
//   },
// });

type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: string;
  status?: string;
  emailVerified: boolean;
};

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.APP_URL!, "http://localhost:4000"],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },
  // emailAndPassword: {
  //   enabled: true,
  //   autoSignIn: false,
  //   requireEmailVerification: false,
  // },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,

    // ✅ Sign-in hook: blocked users cannot login
   signIn: async ({ user }: { user: AuthUser }) => {
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { status: true },
      });

      if (!dbUser || dbUser.status !== "ACTIVE") {
        // banned or missing user → block login
        throw new Error("Your account is banned or inactive");
      }

      return user; // allow login
    },
  },
  //   emailVerification: {
  //     sendOnSignUp: true,
  //     autoSignInAfterVerification: true,
  //     sendVerificationEmail: async ({ user, url, token }, request) => {
  //       try {
  //         console.log({ user, url, token });
  //         const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
  //         const info = await transporter.sendMail({
  //           from: '"Blog App" <blogapp@gmail.com>',
  //           to: user.email,
  //           subject: "Verify your email",
  //           text: `Please verify your email by clicking on the following link: ${verificationUrl}`,
  //           html: `<!DOCTYPE html>
  // <html lang="en">
  // <head>
  //   <meta charset="UTF-8">
  //   <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //   <title>Email Verification</title>
  // </head>
  // <body style="margin:0; padding:0; font-family: 'Helvetica', Arial, sans-serif; background-color:#f4f4f4;">
  //   <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
  //     <tr>
  //       <td style="background-color:#4f46e5; padding: 20px; text-align:center; color:#ffffff;">
  //         <h1 style="margin:0; font-size:24px;">Blog App</h1>
  //       </td>
  //     </tr>
  //     <tr>
  //       <td style="padding: 30px;">
  //         <p style="font-size:16px; color:#333333;">Hi <strong>${user.name}</strong>,</p>
  //         <p style="font-size:16px; color:#333333;">
  //           Thank you for signing up for <strong>Blog App</strong>. Please verify your email address by clicking the button below:
  //         </p>
  //         <p style="text-align:center; margin: 30px 0;">
  //           <a href="${verificationUrl}" style="background-color:#4f46e5; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:6px; font-weight:bold; display:inline-block;">
  //             Verify Email
  //           </a>
  //         </p>
  //         <p style="font-size:14px; color:#555555;">
  //           If the button doesn't work, copy and paste the following link into your browser:
  //         </p>
  //         <p style="font-size:14px; word-break:break-all; color:#4f46e5;">
  //           <a href="${verificationUrl}" style="color:#4f46e5; text-decoration:none;">${verificationUrl}</a>
  //         </p>
  //         <p style="font-size:14px; color:#555555;">If you did not create an account, you can safely ignore this email.</p>
  //         <p style="margin-top:30px; font-size:12px; color:#999999; text-align:center;">
  //           © 2026 Blog App. All rights reserved.
  //         </p>
  //       </td>
  //     </tr>
  //   </table>
  // </body>
  // </html>
  // `,
  //         });
  //         console.log("Message sent: %s", info.messageId);
  //       } catch (error) {
  //         console.error("Error sending email:", error);
  //         throw error;
  //       }
  //     },
  //   },
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowdangerousEmailAccountTakeover: true,
    },
  },
});
