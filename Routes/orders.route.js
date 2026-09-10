import express from "express";

import {
  createOrderController,
  getOrdersController,
  updateOrderStatusController,
  getRecentOrdersController,
} from "../Controllers/orders.controller.js";

const router = express.Router();

router.post("/", createOrderController);

// مهم: قبل از :id باشد
router.get("/recent", getRecentOrdersController);

router.get("/", getOrdersController);

router.get("/:id", getOrdersController);

router.patch("/:id/status", updateOrderStatusController);

export default router;
