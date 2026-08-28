import prisma from "../Database/prisma.js";
// GET ALL USERS
export const getAllUsers = async () => {
  return await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};
// GET USER BY ID
export const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
};
// GET USER BY NAME
export const getUserByName = async (firstName) => {
  return await prisma.user.findFirst({
    where: {
      firstName: firstName,
    },
  });
};
// GET USER BY EMAIL
export const getUserByEmail = async (email) => {
  return await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
}
// CREATE USER
export const createUser = async (user) => {
  return await prisma.user.create({
    data: {
      firstName: user.first_name,

      lastName: user.last_name,

      email: user.email,

      passwordHash: user.password_hash,
    },
  });
};
// UPDATE USER
export const updateUser = async (id, user) => {
  return await prisma.user.update({
    where: {
      id: id,
    },

    data: {
      firstName: user.first_name,

      lastName: user.last_name,

      email: user.email,
    },
  });
};
// DELETE USER
export const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: {
      id: id,
    },
  });
};
