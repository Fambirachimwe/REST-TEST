const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const orderController = require('../controllers/orders')


router.get('/', checkAuth, orderController.getAllOrders);

router.post('/',checkAuth, orderController.placeOrder );

router.get('/:orderId',checkAuth, orderController.orderDetail);

router.delete('/:orderId',checkAuth,orderController.deleteOrder);

module.exports = router;