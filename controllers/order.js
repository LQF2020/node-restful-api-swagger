const mongoose = require('mongoose');
const Order = require('../db/model/order');

const orderController = {
    getAllOrders(req, res) {
        Order.find()
            .select('-__v')
            .exec()
            .then((docs) => {
                const response = {
                    count: docs.length,
                    orders: docs.map((item) => {
                        return {
                            _id: item._id,
                            productID: item.productID,
                            quantity: item.quantity,
                            request: {
                                type: 'GET',
                                url: `http://127.0.0.1:3000/orders/${item._id}`
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
            .then((doc) => {
                if (doc) {
                    res.status(200).json(doc);
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
            .then((result) => {
                res.status(201).json({
                    msg: `New order created.`,
                    createdOrder: {
                        _id: result._id,
                        productID: result.productID,
                        quantity: result.quantity,
                        request: {
                            type: 'GET',
                            url: `http://127.0.0.1:3000/orders/${result._id}`
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
                    request: { type: 'GET', url: `http://127.0.0.1:3000/orders/${orderID}` }
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
                        request: { type: 'GET', url: `http://127.0.0.1:3000/orders` }
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
