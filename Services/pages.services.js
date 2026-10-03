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

export const getPageBySlug = async (slug) => {
  return await prisma.page.findUnique({
    where: {
      slug,
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
  const updateData = {
    title: data.title,
    typeOfPage: data.typeOfPage,
    slug: data.slug,
    content: data.content,
    seoTitle: data.seoTitle || null,
    seoDescription: data.seoDescription || null,
    status: data.status,
  };

  if (data.imageUrl) {
    updateData.imageUrl = data.imageUrl;
  }

  return await prisma.page.update({
    where: {
      id,
    },
    data: updateData,
  });
};

export const deletePage = async (id) => {
  return await prisma.page.delete({
    where: {
      id,
    },
  });
};
