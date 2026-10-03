import prisma from "../Database/prisma.js";

export const createOrder = async (data) => {
  if (!data?.userId) {
    throw new Error("User is not authenticated");
  }

  if (!Array.isArray(data.items) || data.items.length === 0) {
    throw new Error("Order must contain at least one item");
  }

  const productIds = [...new Set(data.items.map((item) => item.productId))];

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
      status: "active",
    },
  });

  if (products.length !== productIds.length) {
    throw new Error("One or more products are invalid or unavailable");
  }

  const productMap = new Map(products.map((product) => [product.id, product]));

  const orderItems = data.items.map((item) => {
    const product = productMap.get(item.productId);

    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }

    const quantity = Number(item.quantity);

    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error(`Invalid quantity for product: ${product.name}`);
    }

    if (quantity > product.stock) {
      throw new Error(`Insufficient stock for product: ${product.name}`);
    }

    return {
      productId: product.id,
      quantity,
      price: product.price,
    };
  });

  /*
   * Total price is calculated on the server.
   * Do not trust totalAmount sent from the frontend.
   */
  const totalAmount = orderItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  const order = await prisma.$transaction(async (tx) => {
    const createdOrder = await tx.order.create({
      data: {
        userId: data.userId,
        totalAmount,
        status: "PENDING",
        paymentStatus: "UNPAID",

        items: {
          create: orderItems,
        },
      },

      include: {
        user: true,

        items: {
          include: {
            product: true,
          },
        },

        payments: true,
      },
    });

    await tx.payment.create({
      data: {
        orderId: createdOrder.id,
        amount: totalAmount,
        status: "PENDING",
        paymentMethod: "manual",
        trackingCode: data.trackingCode,
        adminNote: data.description,
        receiptImage: data.receiptImage,
      },
    });

    return createdOrder;
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
      user: true,

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
