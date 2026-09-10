import prisma from "../Database/prisma.js";

export const createOrder = async (data) => {
  const order = await prisma.order.create({
    data: {
      userId: data.userId,

      totalAmount: data.totalAmount,

      status: "PENDING",

      paymentStatus: "UNPAID",

      items: {
        create: data.items.map((item) => ({
          productId: item.productId,

          quantity: item.quantity,

          price: item.price,
        })),
      },
    },

    include: {
      items: true,
    },
  });

  await prisma.payment.create({
    data: {
      orderId: order.id,

      amount: order.totalAmount,

      status: "PENDING",

      paymentMethod: "manual",
    },
  });

  return order;
};

export const getAllOrders = async () => {
  return await prisma.order.findMany({
    include: {
      user: true,

      items: {
        include: {
          product: true,
        },
      },

      payments: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getRecentOrders = async (limit = 3) => {
  return await prisma.order.findMany({
    include: {
      user: true,

      items: {
        include: {
          product: true,
        },
      },

      payments: true,
    },

    orderBy: {
      createdAt: "desc",
    },

    take: limit,
  });
};

export const getOrderById = async (id) => {
  return await prisma.order.findUnique({
    where: {
      id,
    },

    include: {
      items: {
        include: {
          product: true,
        },
      },

      payments: true,
    },
  });
};

export const updateOrderStatus = async (id, status) => {
  return await prisma.order.update({
    where: {
      id,
    },

    data: {
      status: status.toUpperCase(),
    },
  });
};
