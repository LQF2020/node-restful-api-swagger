const express = require('express');
const router = express.Router();
const {
    getAllOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
} = require('../../controllers/order');

router.get('/', getAllOrders);
router.get('/:orderID', getOrder);
router.post('/', createOrder);
router.patch('/:orderID', updateOrder);
router.delete('/:orderID', deleteOrder);

module.exports = router;
