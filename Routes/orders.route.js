import express from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import multer from "multer";

import {
  createOrderController,
  getOrdersController,
  getOrderByIdController,
  updateOrderStatusController,
  getRecentOrdersController,
} from "../Controllers/orders.controller.js";

import { authenticate } from "../Middleware/auth.middleware.js";

const router = express.Router();

/* =========================================
   RECEIPT UPLOAD
========================================= */

const uploadDirectory = path.join(process.cwd(), "uploads", "receipts");

fs.mkdirSync(uploadDirectory, {
  recursive: true,
});

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();

    cb(null, `${crypto.randomUUID()}${extension}`);
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (_req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPEG and PNG images are allowed"));
    }

    cb(null, true);
  },
});

/* =========================================
   CREATE ORDER
========================================= */

router.post("/", authenticate, upload.single("receipt"), createOrderController);

/* =========================================
   GET RECENT ORDERS
========================================= */

router.get("/recent", getRecentOrdersController);

/* =========================================
   GET ALL ORDERS
========================================= */

router.get("/", getOrdersController);

/* =========================================
   GET ORDER BY ID
========================================= */

router.get("/:id", getOrderByIdController);

/* =========================================
   UPDATE ORDER STATUS
========================================= */

router.patch("/:id/status", updateOrderStatusController);

export default router;
