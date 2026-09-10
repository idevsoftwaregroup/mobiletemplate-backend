import prisma from "../Database/prisma.js";

export const getAllProducts = async () => {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  // console.log("DATABASE PRODUCTS:");
  // console.log(products);

  return products;
};

export const getProductById = async (id) => {
  return await prisma.product.findUnique({
    where: {
      id,
    },
  });
};

export const createProduct = async (data) => {
  return await prisma.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      price: Number(data.price),
      imageUrl: data.imageUrl || null,
      category: data.category || null,
      stock: Number(data.stock) || 0,
      status: data.status || "active",
    },
  });
};

export const updateProduct = async (id, data) => {
  return await prisma.product.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      price: Number(data.price),
      ...(data.imageUrl && {
        imageUrl: data.imageUrl,
      }),
      category: data.category || null,
      stock: Number(data.stock),
      status: data.status,
    },
  });
};

export const deleteProduct = async (id) => {
  return await prisma.product.delete({
    where: {
      id,
    },
  });
};
