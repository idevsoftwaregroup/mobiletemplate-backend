import express from "express";

import {
  getPaymentsController,
  updatePaymentStatusController,
} from "../Controllers/payment.controller.js";

const router = express.Router();

router.get("/", getPaymentsController);

router.patch("/:id/status", updatePaymentStatusController);

export default router;
