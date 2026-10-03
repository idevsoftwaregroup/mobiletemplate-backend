import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getRecentOrders,
} from "../Services/orders.services.js";

// CREATE ORDER
export const createOrderController = async (req, res) => {
  try {
    const userId = req.user?.userId ?? req.user?.id ?? req.user?.sub;

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    let items;

    try {
      items = JSON.parse(req.body?.items || "[]");
    } catch {
      return res.status(400).json({
        message: "Invalid order items",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Order must contain at least one item",
      });
    }

    const order = await createOrder({
      userId,
      items,
      trackingCode: req.body?.trackingCode || null,
      description: req.body?.description || null,
      receiptImage: req.file ? `/uploads/receipts/${req.file.filename}` : null,
    });

    return res.status(201).json(order);
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    return res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// GET ALL ORDERS
export const getOrdersController = async (req, res) => {
  try {
    const orders = await getAllOrders();
    return res.json(orders);
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// GET ORDER BY ID
export const getOrderByIdController = async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.json(order);
  } catch (error) {
    console.error("GET ORDER ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

// UPDATE ORDER STATUS
export const updateOrderStatusController = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Order status is required",
      });
    }

    const order = await updateOrderStatus(req.params.id, status);

    return res.json(order);
  } catch (error) {
    console.error("UPDATE ORDER STATUS ERROR:", error);

    return res.status(500).json({
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

// RECENT ORDERS DASHBOARD
export const getRecentOrdersController = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 100;

    const orders = await getRecentOrders(limit);

    return res.json(orders);
  } catch (error) {
    console.error("GET RECENT ORDERS ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch recent orders",
      error: error.message,
    });
  }
};
