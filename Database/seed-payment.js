import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({
    where: {
      email: "arash.ataei.71@gmail.com",
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const products = await prisma.product.createMany({
    data: [
      {
        name: "iPhone 15 Pro",
        slug: "iphone-15-pro",
        description: "Apple iPhone 15 Pro",
        price: 120000000,
        category: "mobile",
        stock: 10,
        status: "active",
        imageUrl: "/uploads/products/iphone15.jpg",
      },

      {
        name: "MacBook Pro M3",
        slug: "macbook-pro-m3",
        description: "Apple MacBook Pro M3",
        price: 220000000,
        category: "laptop",
        stock: 5,
        status: "active",
        imageUrl: "/uploads/products/macbook.jpg",
      },

      {
        name: "AirPods Pro",
        slug: "airpods-pro",
        description: "Apple AirPods Pro",
        price: 15000000,
        category: "accessories",
        stock: 20,
        status: "active",
        imageUrl: "/uploads/products/airpods.jpg",
      },
    ],
  });

  const iphone = await prisma.product.findUnique({
    where: {
      slug: "iphone-15-pro",
    },
  });

  const macbook = await prisma.product.findUnique({
    where: {
      slug: "macbook-pro-m3",
    },
  });

  const order = await prisma.order.create({
    data: {
      userId: user.id,

      status: "pending",

      totalAmount: 340000000,

      items: {
        create: [
          {
            productId: iphone.id,

            quantity: 1,

            price: 120000000,
          },

          {
            productId: macbook.id,

            quantity: 1,

            price: 220000000,
          },
        ],
      },
    },
  });

  await prisma.payment.create({
    data: {
      orderId: order.id,

      amount: 340000000,

      status: "pending_review",

      paymentMethod: "manual",

      receiptImage: null,

      trackingCode: "PAY-TEST-001",
    },
  });

  console.log("Fake Order Created:");
  console.log(order.id);
}

main()
  .catch(console.error)

  .finally(() => prisma.$disconnect());
