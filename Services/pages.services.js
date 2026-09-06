import prisma from "../Database/prisma.js";

export const getAllPages = async () => {
  return await prisma.page.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getPageById = async (id) => {
  return await prisma.page.findUnique({
    where: {
      id,
    },
  });
};

export const createPage = async (data) => {
  return await prisma.page.create({
    data: {
      title: data.title,

      typeOfPage: data.typeOfPage,

      slug: data.slug,

      content: data.content,

      imageUrl: data.imageUrl || null,

      seoTitle: data.seoTitle || null,

      seoDescription: data.seoDescription || null,

      status: data.status || "active",
    },
  });
};

export const updatePage = async (id, data) => {
  return await prisma.page.update({
    where: {
      id,
    },

    data: {
      title: data.title,
      typeOfPage: data.typeOfPage,
      slug: data.slug,
      content: data.content,
      imageUrl: data.imageUrl || null,
      seoTitle: data.seoTitle || null,
      seoDescription: data.seoDescription || null,
      status: data.status,
    },
  });
};

export const deletePage = async (id) => {
  return await prisma.page.delete({
    where: {
      id,
    },
  });
};
