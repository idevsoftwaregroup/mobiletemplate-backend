import dotenv from "dotenv";
dotenv.config();

import prisma from "../Database/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not configured");
}

export const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("پسورد و یا ایمیل نامعتبر است !");
  }

  if (!user.passwordHash) {
    throw new Error("User password is not configured");
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);

  if (!validPassword) {
    throw new Error("پسورد و یا ایمیل نامعتبر است !");
  }

  if (user.status !== "active") {
    throw new Error("User account is not active");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  return {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatarUrl: user.avatarUrl,
      role: user.role,
    },
    token,
  };
};


const revokedTokens = new Set();

export const revokeToken = (token) => {
    revokedTokens.add(token);
};

export const isTokenRevoked = (token) => {
    return revokedTokens.has(token);
};
