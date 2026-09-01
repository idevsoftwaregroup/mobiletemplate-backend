import { Router } from "express";

import {
  getAllProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
} from "../Controllers/products.controller.js";

import {
  authenticate,
  authorize,
} from "../Middleware/auth.middleware.js";

const router = Router();

router.use(
  authenticate,
  authorize("admin")
);

router.get("/", getAllProductsController);

router.get("/:id", getProductByIdController);

router.post("/", createProductController);

router.put("/:id", updateProductController);

router.delete("/:id", deleteProductController);

export default router;
