import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...\n");

  // =========================================================
  // PASSWORDS
  // =========================================================

  const passwordHash = await bcrypt.hash("Admin@123456", 10);

  const arashPasswordHash = await bcrypt.hash("Admin123", 10);

  const userPasswordHash = await bcrypt.hash("Admin123", 10);

  // =========================================================
  // USERS
  // =========================================================

  const admin = await prisma.user.upsert({
    where: {
      email: "admin@mobiletemplate.com",
    },
    update: {},
    create: {
      firstName: "Admin",
      lastName: "User",
      email: "admin@mobiletemplate.com",
      passwordHash,
      role: "admin",
      status: "active",
    },
  });

  const arash = await prisma.user.upsert({
    where: {
      email: "arash.ataei.71@gmail.com",
    },
    update: {},
    create: {
      firstName: "Arash",
      lastName: "Ataei",
      email: "arash.ataei.71@gmail.com",
      passwordHash: arashPasswordHash,
      role: "user",
      status: "active",
    },
  });

  const userOne = await prisma.user.upsert({
    where: {
      email: "userOne@test.com",
    },
    update: {},
    create: {
      firstName: "User",
      lastName: "One",
      email: "userOne@test.com",
      passwordHash: userPasswordHash,
      role: "user",
      status: "active",
    },
  });

  console.log("✅ Users created");
  console.log(`   Admin: ${admin.email}`);
  console.log(`   Arash: ${arash.email}`);
  console.log(`   User One: ${userOne.email}`);

  // =========================================================
  // PRODUCTS
  // =========================================================

  const macbook = await prisma.product.upsert({
    where: {
      slug: "macbook-pro",
    },
    update: {},
    create: {
      name: "MacBook Pro",
      slug: "macbook-pro",
      description: "Apple MacBook Pro",
      price: 125000000,
      category: "Laptop",
      stock: 10,
      status: "active",
    },
  });

  const iphone = await prisma.product.upsert({
    where: {
      slug: "iphone-17-pro",
    },
    update: {},
    create: {
      name: "iPhone 17 Pro",
      slug: "iphone-17-pro",
      description: "Apple iPhone 17 Pro",
      price: 85000000,
      category: "Smartphone",
      stock: 20,
      status: "active",
    },
  });

  const appleWatch = await prisma.product.upsert({
    where: {
      slug: "apple-watch-series-11",
    },
    update: {},
    create: {
      name: "Apple Watch Series 11",
      slug: "apple-watch-series-11",
      description: "Apple Watch Series 11",
      price: 42000000,
      category: "Watch",
      stock: 15,
      status: "active",
    },
  });

  const airpods = await prisma.product.upsert({
    where: {
      slug: "airpods-pro-3",
    },
    update: {},
    create: {
      name: "AirPods Pro 3",
      slug: "airpods-pro-3",
      description: "Apple AirPods Pro 3",
      price: 18000000,
      category: "Audio",
      stock: 30,
      status: "active",
    },
  });

  console.log("\n✅ Products created");

  // =========================================================
  // ORDERS
  // =========================================================

  const order1 = await prisma.order.create({
    data: {
      userId: arash.id,
      status: "paid",
      totalAmount: 125000000,

      items: {
        create: {
          productId: macbook.id,
          quantity: 1,
          price: 125000000,
        },
      },

      payment: {
        create: {
          provider: "zarinpal",
          amount: 125000000,
          status: "paid",
          authority: "TEST-AUTHORITY-001",
          transactionId: "TEST-TRANSACTION-001",
          paidAt: new Date(),
        },
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      userId: userOne.id,
      status: "pending",
      totalAmount: 85000000,

      items: {
        create: {
          productId: iphone.id,
          quantity: 1,
          price: 85000000,
        },
      },

      payment: {
        create: {
          provider: "zarinpal",
          amount: 85000000,
          status: "pending",
          authority: "TEST-AUTHORITY-002",
        },
      },
    },
  });

  const order3 = await prisma.order.create({
    data: {
      userId: arash.id,
      status: "paid",
      totalAmount: 42000000,

      items: {
        create: {
          productId: appleWatch.id,
          quantity: 1,
          price: 42000000,
        },
      },

      payment: {
        create: {
          provider: "zarinpal",
          amount: 42000000,
          status: "paid",
          authority: "TEST-AUTHORITY-003",
          transactionId: "TEST-TRANSACTION-003",
          paidAt: new Date(),
        },
      },
    },
  });

  const order4 = await prisma.order.create({
    data: {
      userId: userOne.id,
      status: "canceled",
      totalAmount: 18000000,

      items: {
        create: {
          productId: airpods.id,
          quantity: 1,
          price: 18000000,
        },
      },

      payment: {
        create: {
          provider: "zarinpal",
          amount: 18000000,
          status: "failed",
          authority: "TEST-AUTHORITY-004",
        },
      },
    },
  });

  const order5 = await prisma.order.create({
    data: {
      userId: arash.id,
      status: "paid",
      totalAmount: 103000000,

      items: {
        create: [
          {
            productId: iphone.id,
            quantity: 1,
            price: 85000000,
          },
          {
            productId: airpods.id,
            quantity: 1,
            price: 18000000,
          },
        ],
      },

      payment: {
        create: {
          provider: "zarinpal",
          amount: 103000000,
          status: "paid",
          authority: "TEST-AUTHORITY-005",
          transactionId: "TEST-TRANSACTION-005",
          paidAt: new Date(),
        },
      },
    },
  });

  console.log("\n✅ Orders created");

  // =========================================================
  // SUMMARY
  // =========================================================

  console.log("\n========================================");
  console.log("🎉 SEED COMPLETED SUCCESSFULLY");
  console.log("========================================");

  console.log("\n👤 USERS");
  console.log("----------------------------------------");
  console.log(`Admin    : ${admin.email}`);
  console.log(`Arash    : ${arash.email}`);
  console.log(`User One : ${userOne.email}`);

  console.log("\n📦 PRODUCTS");
  console.log("----------------------------------------");
  console.log(`MacBook Pro       : ${macbook.id}`);
  console.log(`iPhone 17 Pro     : ${iphone.id}`);
  console.log(`Apple Watch       : ${appleWatch.id}`);
  console.log(`AirPods Pro       : ${airpods.id}`);

  console.log("\n🛒 ORDERS");
  console.log("----------------------------------------");
  console.log(`Order 1 : ${order1.id} | PAID`);
  console.log(`Order 2 : ${order2.id} | PENDING`);
  console.log(`Order 3 : ${order3.id} | PAID`);
  console.log(`Order 4 : ${order4.id} | CANCELED`);
  console.log(`Order 5 : ${order5.id} | PAID`);

  console.log("\n========================================\n");
}

main()
  .catch((error) => {
    console.error("\n❌ Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
