import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import usersRouter from "./Routes/users.route.js";
import authRouter from "./Routes/auth.route.js";
import productsRouter from "./Routes/products.route.js";
import pagesRouter from "./Routes/pages.route.js";
import dashboardRouter from "./Routes/dashboard.route.js";
import ordersRouter from "./Routes/orders.route.js";
import paymentRouter from "./Routes/payment.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/pages", pagesRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/payments", paymentRouter);

export default app;
