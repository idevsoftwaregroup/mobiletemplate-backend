import prisma from "../Database/prisma.js";

export const getAllProducts = async () => {
  return await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getProductById = async (id) => {
  return await prisma.product.findUnique({
    where: { id },
  });
};

export const createProduct = async (data) => {
  return await prisma.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      price: data.price,
      imageUrl: data.imageUrl,
      category: data.category,
      stock: data.stock ?? 0,
      status: data.status ?? "active",
    },
  });
};

export const updateProduct = async (id, data) => {
  return await prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id) => {
  return await prisma.product.delete({
    where: { id },
  });
};
