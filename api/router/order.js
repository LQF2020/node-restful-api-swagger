const express = require('express');
const router = express.Router();
const checkAuth = require('../../middlewares/checkAuth');
const {
    getAllOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
} = require('../../controllers/order');

router.get('/', getAllOrders);
router.get('/:orderID', getOrder);
router.post('/', checkAuth, createOrder);
router.patch('/:orderID', checkAuth, updateOrder);
router.delete('/:orderID', checkAuth, deleteOrder);

module.exports = router;
