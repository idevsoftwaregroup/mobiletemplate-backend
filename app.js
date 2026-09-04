import express from "express";
import cors from "cors";

import usersRouter from "./Routes/users.route.js";
import authRouter from "./Routes/auth.route.js";
import productsRouter from "./Routes/products.route.js";

const app = express();


app.use(cors({
  origin: true,
  credentials: true
}));


app.use(express.json());


app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);


export default app;
