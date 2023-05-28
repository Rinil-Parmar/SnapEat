const express = require('express');
const router = express.Router();

const { getOrderbyID, getAllOrders, createOrder, UpdateStatus, deleteOrderItem } = require("../controller/orderController");

router.route("/order/add").post(createOrder);
router.route("/orders").get(getAllOrders);
router.route("/order/status/:id").post(UpdateStatus);
router.route("/order/:id")
  .get(getOrderbyID)
  .delete(deleteOrderItem);



module.exports = router;
