import prisma from "../Database/prisma.js";

export const createPayment = async (order) => {
  return await prisma.payment.create({
    data: {
      orderId: order.id,

      amount: order.totalAmount,

      status: "pending_review",

      paymentMethod: "manual",
    },
  });
};

export const uploadReceipt = async (id, image) => {
  return await prisma.payment.update({
    where: {
      id,
    },

    data: {
      receiptImage: image,

      status: "pending_review",
    },
  });
};

export const getPendingPayments = async () => {
  return await prisma.payment.findMany({
    where: {
      status: "pending_review",
    },

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

export const reviewPayment = async (paymentId, status, adminId, note) => {
  const payment = await prisma.payment.findUnique({
    where: {
      id: paymentId,
    },

    include: {
      order: {
        include: {
          items: true,
        },
      },
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  if (status === "paid") {
    for (const item of payment.order.items) {
      await prisma.product.update({
        where: {
          id: item.productId,
        },

        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    await prisma.order.update({
      where: {
        id: payment.orderId,
      },

      data: {
        status: "paid",
      },
    });
  }

  if (status === "rejected") {
    await prisma.order.update({
      where: {
        id: payment.orderId,
      },

      data: {
        status: "cancelled",
      },
    });
  }

  return await prisma.payment.update({
    where: {
      id: paymentId,
    },

    data: {
      status,

      adminNote: note || null,

      reviewedAt: new Date(),

      reviewedBy: adminId,
    },
  });
};
