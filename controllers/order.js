const mongoose = require('mongoose');
const Order = require('../db/model/order');

const orderController = {
    getAllOrders(req, res) {
        Order.find()
            .select('-__v')
            .exec()
            .then((items) => {
                const response = {
                    count: items.length,
                    orders: items.map((item) => {
                        return {
                            _id: item._id,
                            productID: item.productID,
                            quantity: item.quantity,
                            request: {
                                type: 'GET',
                                url: `${process.env.BASE_URL}/orders/${item._id}`
                            }
                        };
                    })
                };
                res.status(200).json(response);
            })
            .catch((e) =>
                res.status(500).json({
                    error: e
                })
            );
    },
    getOrder(req, res) {
        const { orderID } = req.params;
        Order.findById(orderID)
            .select('-__v')
            .exec()
            .then((item) => {
                if (item) {
                    res.status(200).json(item);
                } else {
                    res.status(404).json({
                        msg: 'No valid entry found.'
                    });
                }
            })
            .catch((e) =>
                res.status(500).json({
                    error: e
                })
            );
    },
    createOrder(req, res) {
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            productID: req.body.productID,
            quantity: req.body.quantity
        });
        order
            .save()
            .then((item) => {
                res.status(201).json({
                    msg: `New order created.`,
                    createdOrder: {
                        _id: item._id,
                        productID: item.productID,
                        quantity: item.quantity,
                        request: {
                            type: 'GET',
                            url: `${process.env.BASE_URL}/orders/${item._id}`
                        }
                    }
                });
            })
            .catch((e) => res.status(500).json({ error: e }));
    },
    updateOrder(req, res) {
        const { orderID } = req.params;
        const updateOps = req.body;
        Order.update({ _id: orderID }, { $set: updateOps })
            .exec()
            .then((result) => {
                res.status(200).json({
                    msg: 'Order updated successfully.',
                    request: { type: 'GET', url: `${process.env.BASE_URL}/orders/${orderID}` }
                });
            })
            .catch((e) => {
                res.status(500).json({ error: e });
            });
    },
    deleteOrder(req, res) {
        const { orderID } = req.params;
        Order.remove({ _id: orderID })
            .exec()
            .then((result) => {
                if (result.deletedCount >= 1) {
                    res.status(200).json({
                        msg: 'Order deleted successfully.',
                        request: { type: 'GET', url: `${process.env.BASE_URL}/orders` }
                    });
                } else {
                    res.status(404).json({
                        msg: 'Failed to delete order. Please make sure provide a correct orderID.'
                    });
                }
            })
            .catch((e) => res.status(500).json({ error: e }));
    }
};

module.exports = orderController;
