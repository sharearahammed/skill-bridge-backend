import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./prisma.js";
import { signToken } from "./auth.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName;
        const image = profile.photos?.[0]?.value;

        if (!email) {
          return done(new Error("No email found from Google account"), false);
        }

        // Check if user already exists
        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          // Create new user
          user = await prisma.user.create({
            data: {
              name,
              email,
              image,
              role: "STUDENT",
              status: "ACTIVE",
            },
          });
        }

        if (user.status !== "ACTIVE") {
          return done(new Error("Your account is not active. Contact admin."), false);
        }

        const token = signToken({
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          status: user.status,
        });

        return done(null, { token });
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

export default passport;