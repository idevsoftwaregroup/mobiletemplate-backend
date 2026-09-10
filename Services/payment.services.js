import prisma from "../Database/prisma.js";

export const getPayments = async () => {
  return prisma.payment.findMany({
    include: {
      order: {
        include: {
          user: true,

          items: {
            include: {
              product: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const updatePaymentStatus = async (id, status) => {
  return await prisma.payment.update({
    where: {
      id,
    },

    data: {
      status: status.toUpperCase(),
    },
  });
};
