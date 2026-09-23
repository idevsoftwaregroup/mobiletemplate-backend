import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed ...\n");

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
    update: {
      firstName: "Admin",
      lastName: "User",
      passwordHash,
      role: "admin",
      status: "active",
    },
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
    update: {
      firstName: "Arash",
      lastName: "Ataei",
      passwordHash: arashPasswordHash,
      role: "user",
      status: "active",
    },
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
    update: {
      firstName: "User",
      lastName: "One",
      passwordHash: userPasswordHash,
      role: "user",
      status: "active",
    },
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
  console.log(`   Admin   : ${admin.email}`);
  console.log(`   Arash   : ${arash.email}`);
  console.log(`   User One: ${userOne.email}`);

  // =========================================================
  // PRODUCTS
  // =========================================================

  const stressCourse = await prisma.product.upsert({
    where: {
      slug: "stress-anxiety-management-course",
    },
    update: {
      name: "دوره مدیریت استرس و اضطراب",
      description:
        "دوره جامع آموزشی برای شناخت عوامل استرس، تکنیک‌های آرام‌سازی، کنترل اضطراب و بهبود کیفیت زندگی.",
      price: 2500000,
      category: "دوره آموزشی",
      stock: 100,
      status: "active",
    },
    create: {
      name: "دوره مدیریت استرس و اضطراب",
      slug: "stress-anxiety-management-course",
      description:
        "دوره جامع آموزشی برای شناخت عوامل استرس، تکنیک‌های آرام‌سازی، کنترل اضطراب و بهبود کیفیت زندگی.",
      price: 2500000,
      category: "دوره آموزشی",
      stock: 100,
      status: "active",
    },
  });

  const personalityBook = await prisma.product.upsert({
    where: {
      slug: "personality-psychology-book",
    },
    update: {
      name: "کتاب روانشناسی شخصیت",
      description:
        "کتاب آموزشی درباره شناخت تیپ‌های شخصیتی، رفتار انسان و توسعه فردی.",
      price: 450000,
      category: "کتاب",
      stock: 50,
      status: "active",
    },
    create: {
      name: "کتاب روانشناسی شخصیت",
      slug: "personality-psychology-book",
      description:
        "کتاب آموزشی درباره شناخت تیپ‌های شخصیتی، رفتار انسان و توسعه فردی.",
      price: 450000,
      category: "کتاب",
      stock: 50,
      status: "active",
    },
  });

  const counselingSession = await prisma.product.upsert({
    where: {
      slug: "online-individual-counseling-session",
    },
    update: {
      name: "جلسه مشاوره فردی آنلاین",
      description:
        "یک جلسه 60 دقیقه‌ای مشاوره آنلاین با متخصص روانشناسی برای بررسی مسائل فردی.",
      price: 1200000,
      category: "مشاوره",
      stock: 999,
      status: "active",
    },
    create: {
      name: "جلسه مشاوره فردی آنلاین",
      slug: "online-individual-counseling-session",
      description:
        "یک جلسه 60 دقیقه‌ای مشاوره آنلاین با متخصص روانشناسی برای بررسی مسائل فردی.",
      price: 1200000,
      category: "مشاوره",
      stock: 999,
      status: "active",
    },
  });

  const mbtiTest = await prisma.product.upsert({
    where: {
      slug: "mbti-personality-test",
    },
    update: {
      name: "تست شخصیت شناسی MBTI",
      description: "ارزیابی شخصیت بر اساس مدل MBTI به همراه گزارش تحلیل شخصیت.",
      price: 350000,
      category: "تست روانشناسی",
      stock: 999,
      status: "active",
    },
    create: {
      name: "تست شخصیت شناسی MBTI",
      slug: "mbti-personality-test",
      description: "ارزیابی شخصیت بر اساس مدل MBTI به همراه گزارش تحلیل شخصیت.",
      price: 350000,
      category: "تست روانشناسی",
      stock: 999,
      status: "active",
    },
  });

  console.log("\n✅ Products created");

  // =========================================================
  // REMOVE PREVIOUS DEMO ORDERS
  // =========================================================

  const demoPayments = await prisma.payment.findMany({
    where: {
      trackingCode: {
        startsWith: "TEST-TRANSACTION-",
      },
    },
    select: {
      orderId: true,
    },
  });

  const demoOrderIds = [
    ...new Set(demoPayments.map((payment) => payment.orderId)),
  ];

  if (demoOrderIds.length > 0) {
    await prisma.order.deleteMany({
      where: {
        id: {
          in: demoOrderIds,
        },
      },
    });
  }

  // =========================================================
  // ORDERS
  // =========================================================

  const order1 = await prisma.order.create({
    data: {
      userId: arash.id,
      status: "PROCESSING",
      paymentStatus: "PAID",
      totalAmount: 2500000,
      items: {
        create: {
          productId: stressCourse.id,
          quantity: 1,
          price: 2500000,
        },
      },
      payments: {
        create: {
          amount: 2500000,
          status: "PAID",
          paymentMethod: "zarinpal",
          trackingCode: "TEST-TRANSACTION-001",
        },
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      userId: userOne.id,
      status: "PENDING",
      paymentStatus: "UNPAID",
      totalAmount: 450000,
      items: {
        create: {
          productId: personalityBook.id,
          quantity: 1,
          price: 450000,
        },
      },
      payments: {
        create: {
          amount: 450000,
          status: "PENDING",
          paymentMethod: "zarinpal",
          trackingCode: "TEST-TRANSACTION-002",
        },
      },
    },
  });

  const order3 = await prisma.order.create({
    data: {
      userId: arash.id,
      status: "DELIVERED",
      paymentStatus: "PAID",
      totalAmount: 1200000,
      items: {
        create: {
          productId: counselingSession.id,
          quantity: 1,
          price: 1200000,
        },
      },
      payments: {
        create: {
          amount: 1200000,
          status: "PAID",
          paymentMethod: "zarinpal",
          trackingCode: "TEST-TRANSACTION-003",
        },
      },
    },
  });

  const order4 = await prisma.order.create({
    data: {
      userId: userOne.id,
      status: "CANCELLED",
      paymentStatus: "FAILED",
      totalAmount: 350000,
      items: {
        create: {
          productId: mbtiTest.id,
          quantity: 1,
          price: 350000,
        },
      },
      payments: {
        create: {
          amount: 350000,
          status: "FAILED",
          paymentMethod: "zarinpal",
          trackingCode: "TEST-TRANSACTION-004",
        },
      },
    },
  });

  const order5 = await prisma.order.create({
    data: {
      userId: arash.id,
      status: "CONFIRMED",
      paymentStatus: "PAID",
      totalAmount: 800000,
      items: {
        create: [
          {
            productId: personalityBook.id,
            quantity: 1,
            price: 450000,
          },
          {
            productId: mbtiTest.id,
            quantity: 1,
            price: 350000,
          },
        ],
      },
      payments: {
        create: {
          amount: 800000,
          status: "PAID",
          paymentMethod: "zarinpal",
          trackingCode: "TEST-TRANSACTION-005",
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
  console.log(`User One  : ${userOne.email}`);

  console.log("\n📦 PRODUCTS");
  console.log("----------------------------------------");
  console.log(`Stress Course      : ${stressCourse.id}`);
  console.log(`Psychology Book    : ${personalityBook.id}`);
  console.log(`Counseling Session : ${counselingSession.id}`);
  console.log(`MBTI Test          : ${mbtiTest.id}`);

  console.log("\n🛒 ORDERS");
  console.log("----------------------------------------");
  console.log(`Order 1 : ${order1.id} | PROCESSING`);
  console.log(`Order 2 : ${order2.id} | PENDING`);
  console.log(`Order 3 : ${order3.id} | DELIVERED`);
  console.log(`Order 4 : ${order4.id} | CANCELLED`);
  console.log(`Order 5 : ${order5.id} | CONFIRMED`);

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
