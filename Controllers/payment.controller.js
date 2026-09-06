import {
  uploadReceipt,
  getPendingPayments,
  reviewPayment,
} from "../Services/payment.services.js";

export const uploadReceiptController = async (req, res) => {
  try {
    const payment = await uploadReceipt(
      req.params.id,

      req.file ? `/uploads/payments/${req.file.filename}` : null,
    );

    res.json(payment);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPendingPaymentsController = async (req, res) => {
  try {
    const payments = await getPendingPayments();

    res.json(payments);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const reviewPaymentController = async (req, res) => {
  try {
    const { status, note } = req.body;

    const payment = await reviewPayment(
      req.params.id,

      status,

      "ADMIN_ID",

      note,
    );

    res.json(payment);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
