import {
  getDashboardStats,
  getRecentOrders,
  getPendingPayments,
} from "../Services/dashboard.services.js";

export const dashboardStatsController = async (req, res) => {
  try {
    const data = await getDashboardStats();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Dashboard stats error",
    });
  }
};

export const recentOrdersController = async (req, res) => {
  try {
    const data = await getRecentOrders();

    res.json(data);
    console.log("Recent Orders : ", data);
  } catch (error) {
    res.status(500).json({
      message: "Recent orders error",
    });
  }
};

export const pendingPaymentsController = async (req, res) => {
  try {
    const data = await getPendingPayments();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Pending payments error",
    });
  }
};
