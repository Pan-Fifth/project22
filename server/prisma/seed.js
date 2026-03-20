import bcrypt from "bcrypt";
import { prisma } from "../src/libs/prismaClient.js";
import { AuthProvider, Role } from "@prisma/client";

async function main() {
  const passwordHash = await bcrypt.hash("123456", 10);

  // 👤 USERS (5 คน)
  const users = await Promise.all([
    prisma.user.create({
      data: {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        role: Role.USER,
        auths: {
          create: {
            provider: AuthProvider.LOCAL,
            username: "john_doe",
            password: passwordHash,
          },
        },
      },
    }),

    prisma.user.create({
      data: {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        role: Role.USER,
        auths: {
          create: [
            {
              provider: AuthProvider.LOCAL,
              username: "jane_smith",
              password: passwordHash,
            },
            {
              provider: AuthProvider.GOOGLE,
              providerId: "google-jane-001",
            },
          ],
        },
      },
    }),

    prisma.user.create({
      data: {
        firstName: "Alice",
        lastName: "Brown",
        email: "alice@example.com",
        role: Role.USER,
        auths: {
          create: {
            provider: AuthProvider.LOCAL,
            username: "alice_brown",
            password: passwordHash,
          },
        },
      },
    }),

    prisma.user.create({
      data: {
        firstName: "Bob",
        lastName: "Wilson",
        email: "bob@example.com",
        role: Role.USER,
        auths: {
          create: {
            provider: AuthProvider.LOCAL,
            username: "bob_wilson",
            password: passwordHash,
          },
        },
      },
    }),

    prisma.user.create({
      data: {
        firstName: "Admin",
        lastName: "User",
        email: "admin@example.com",
        role: Role.ADMIN,
        auths: {
          create: {
            provider: AuthProvider.LOCAL,
            username: "admin",
            password: passwordHash,
          },
        },
      },
    }),
  ]);

  // 🛍️ PRODUCTS (15 ชิ้น)
  const productsData = [
    { name: "T-Shirt", price: 199 },
    { name: "Jeans", price: 799 },
    { name: "Sneakers", price: 1299 },
    { name: "Jacket", price: 1599 },
    { name: "Hat", price: 149 },
    { name: "Backpack", price: 899 },
    { name: "Watch", price: 1999 },
    { name: "Sunglasses", price: 499 },
    { name: "Wallet", price: 299 },
    { name: "Belt", price: 249 },
    { name: "Hoodie", price: 999 },
    { name: "Shorts", price: 399 },
    { name: "Sandals", price: 349 },
    { name: "Cap", price: 129 },
    { name: "Sweater", price: 1099 },
  ];

  const products = await Promise.all(
    productsData.map((p, index) =>
      prisma.product.create({
        data: {
          name: p.name,
          description: `${p.name} description`,
          price: p.price,
          stock: 10 + index * 2,
          imageUrl: `https://picsum.photos/seed/${p.name}/300/300`,
        },
      }),
    ),
  );

  // 🛒 สร้าง cart ให้ user คนแรก
  await prisma.cart.create({
    data: {
      userId: users[0].id,
      items: {
        create: [
          {
            productId: products[0].id,
            quantity: 2,
          },
          {
            productId: products[1].id,
            quantity: 1,
          },
        ],
      },
    },
  });

  console.log("🌱 Seed สำเร็จ: 5 users + 15 products");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
