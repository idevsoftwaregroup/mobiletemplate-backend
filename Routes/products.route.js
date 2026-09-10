import { Router } from "express";

import {
  getAllProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
} from "../Controllers/products.controller.js";

import { authenticate, authorize } from "../Middleware/auth.middleware.js";

import upload from "../Middleware/upload.middleware.js";

const router = Router();

// router.use(authenticate);

router.get("/", getAllProductsController);

router.get("/:id", getProductByIdController);

// router.post("/", createProductController);

router.post("/", upload.single("image"), createProductController);

// router.put("/:id", updateProductController);

router.put("/:id", upload.single("image"), updateProductController);

router.delete("/:id", deleteProductController);

export default router;
