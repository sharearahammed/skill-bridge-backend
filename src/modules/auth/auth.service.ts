import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma.js";
import { signToken } from "../../lib/auth.js";

const register = async (input: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: "STUDENT" | "TUTOR";
}) => {
  const existing = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (existing) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(input.password, 12);

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      password: hashedPassword,
      phone: input.phone,
      role: input.role ?? "STUDENT",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      phone: true,
      image: true,
      createdAt: true,
    },
  });

  return user;
};

const login = async (input: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (!user.password) {
    throw new Error("Please use Google login for this account");
  }

  const isMatch = await bcrypt.compare(input.password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  if (user.status !== "ACTIVE") {
    throw new Error("Your account is not active. Contact admin.");
  }

  const token = signToken({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    status: user.status,
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      image: user.image,
      phone: user.phone,
    },
  };
};

export const AuthService = { register, login };
