import jwt from "jsonwebtoken";
import createError from 'http-errors'
import { prisma } from "../libs/prismaClient.js";
import bcrypt from "bcrypt";

export async function createUser(data) {
  const passwordHash = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create(
    {
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: "USER",
        auths: {
          create: {
            provider: "LOCAL",
            username: data.username,
            password: passwordHash,
          },
        },
      },
    });
  return user;
}

export async function getUser(id) {
  return await prisma.user.findUnique({
    where: { id },
  });
}
export async function getUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
}

export async function editUser(id, data) {
  const newData = await prisma.user.update({
    where: {
      id: id,
    },
    data: data,
  });

  return newData;
}

export async function deleteUser(id) {
  const delUser = await prisma.user.delete({
    where: {
      id: id,
    },
  });
}
export async function loginByEmail(email, inputPassword) {
  const user = await getUserByEmail(email);
  if (!user) createError(400, "User not found");

  const { id, firstName, lastName } = user;

  const auth = await prisma.auth.findFirst({
    where: { userId: id },
  });

  if (!auth) createError(400, "Auth not found");

  const { password, username } = auth;

  const isMatch = await bcrypt.compare(inputPassword, password);
  if (!isMatch) createError(400, "Password mismatch");

  const payload = { id, firstName, lastName, username, email };

  const token = await jwt.sign(payload, "SECRET", {
    expiresIn: "1d",
  });

  return {
    user: {
      id,
      firstName,
      lastName,
      username,
      email,
    },
    token,
  };
}
