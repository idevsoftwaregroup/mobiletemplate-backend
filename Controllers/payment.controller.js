import {
  getPayments,
  updatePaymentStatus,
} from "../Services/payment.services.js";

export const getPaymentsController = async (req, res) => {
  try {
    const payments = await getPayments();

    res.json(payments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updatePaymentStatusController = async (req, res) => {
  try {
    const { id } = req.params;

    const { status } = req.body;

    const payment = await updatePaymentStatus(id, status);

    res.json(payment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
