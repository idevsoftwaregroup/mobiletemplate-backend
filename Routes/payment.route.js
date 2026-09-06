import express from "express";

import uploadPayment from "../Middleware/payment.upload.middleware.js";

import {

uploadReceiptController,
getPendingPaymentsController,
reviewPaymentController

} from "../Controllers/payment.controller.js";


const router = express.Router();



router.post(

"/:id/receipt",

uploadPayment.single("image"),

uploadReceiptController

);



router.get(

"/pending",

getPendingPaymentsController

);



router.patch(

"/:id/review",

reviewPaymentController

);



export default router;
