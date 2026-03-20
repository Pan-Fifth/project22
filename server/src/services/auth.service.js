import { prisma } from "../libs/prismaClient.js";

export async function createUser(data) {
  const user = await prisma.user.create({ data });
  return user;
}

export async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
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
