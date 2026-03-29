import { Router, Request, Response } from "express";
import passport from "../../lib/passport.js";

const router = Router();

// Step 1 — Redirect to Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

// Step 2 — Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_failed`,
  }),
  (req: Request, res: Response) => {
    const user = req.user as unknown as { token: string };
    // Redirect to frontend with token in URL
    res.redirect(
      `${process.env.FRONTEND_URL}/auth/google/callback?token=${user.token}`,
    );
  },
);

export const googleAuthRouter: Router = router;
