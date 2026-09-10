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
    const order = await createOrder(req.body);

    res.status(201).json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// GET ALL ORDERS
export const getOrdersController = async (req, res) => {
  try {
    const orders = await getAllOrders();

    res.json(orders);
  } catch (error) {
    console.error(error);

    res.status(500).json({
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

    res.json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

// UPDATE ORDER STATUS
export const updateOrderStatusController = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await updateOrderStatus(req.params.id, status);

    res.json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
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

    res.json(orders);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch recent orders",
      error: error.message,
    });
  }
};
