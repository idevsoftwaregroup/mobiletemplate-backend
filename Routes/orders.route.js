import express from "express";

import {

createOrderController,
getOrdersController,
getOrderController,
updateOrderStatusController

} from "../Controllers/orders.controller.js";


const router = express.Router();



router.post(
"/",
createOrderController
);



router.get(
"/",
getOrdersController
);



router.get(
"/:id",
getOrderController
);



router.patch(
"/:id/status",
updateOrderStatusController
);



export default router;
