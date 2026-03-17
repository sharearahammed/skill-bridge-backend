"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const better_auth_1 = require("better-auth");
const prisma_1 = require("better-auth/adapters/prisma");
const prisma_2 = require("./prisma");
exports.auth = (0, better_auth_1.betterAuth)({
    database: (0, prisma_1.prismaAdapter)(prisma_2.prisma, {
        provider: "postgresql",
    }),
    trustedOrigins: [process.env.APP_URL, "http://localhost:4000"],
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
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: false,
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
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowdangerousEmailAccountTakeover: true,
        },
    },
});
