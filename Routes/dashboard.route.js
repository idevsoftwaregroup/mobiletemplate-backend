import express from "express";

import {
  dashboardStatsController,
  recentOrdersController,
  pendingPaymentsController,
} from "../Controllers/dashboard.controller.js";

const router = express.Router();

router.get("/stats", dashboardStatsController);

router.get("/recent", recentOrdersController);

router.get("/pending-payments", pendingPaymentsController);

export default router;
