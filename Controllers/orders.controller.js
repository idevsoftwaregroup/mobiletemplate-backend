import {
 createOrder,
 getAllOrders,
 getOrderById,
 updateOrderStatus
} from "../Services/orders.services.js";



export const createOrderController = async(req,res)=>{

try{


const order = await createOrder(req.body);


res.status(201).json(order);


}catch(error){

console.error(error);

res.status(500).json({
message:error.message
});

}

};





export const getOrdersController = async(req,res)=>{

try{

const orders = await getAllOrders();

res.json(orders);


}catch(error){

res.status(500).json({
message:error.message
});

}

};





export const getOrderController = async(req,res)=>{

try{

const order = await getOrderById(req.params.id);


res.json(order);


}catch(error){

res.status(500).json({
message:error.message
});

}

};





export const updateOrderStatusController = async(req,res)=>{

try{


const order = await updateOrderStatus(
req.params.id,
req.body.status
);


res.json(order);


}catch(error){

res.status(500).json({
message:error.message
});

}

};
