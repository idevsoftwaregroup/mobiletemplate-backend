import express from "express";
import cors from "cors";

import usersRouter from "./Routes/users.route.js";
import authRouter from "./Routes/auth.route.js";

// Import the Products:
import productsRouter from "./Routes/products.route.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/products",productsRouter);

export default app;
