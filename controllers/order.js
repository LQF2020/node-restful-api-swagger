const mongoose = require('mongoose');
const Order = require('../db/model/order');
const Product = require('../db/model/product');

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
                                url: `http://${process.env.HOST}:${process.env.PORT}/orders/${item._id}`
                            }
                        };
                    })
                };
                res.status(200).json(response);
            })
            .catch((e) => res.status(500).json({ error: 'Internal server error.' }));
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
            .catch((e) => res.status(500).json({ error: 'Internal server error.' }));
    },
    createOrder(req, res) {
        Product.findOne({ _id: req.body.productID })
            .exec()
            .then((product) => {
                if (product) {
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
                                        url: `http://${process.env.HOST}:${process.env.PORT}/orders/${item._id}`
                                    }
                                }
                            });
                        })
                        .catch((e) => res.status(500).json({ error: 'Internal server error.' }));
                } else {
                    res.status(404).json({ msg: 'Product not exist.' });
                }
            })
            .catch((e) => res.status(500).json({ msg: 'Internal server error.' }));
    },
    updateOrder(req, res) {
        const { orderID } = req.params;
        const updateOps = req.body;
        Order.updateOne({ _id: orderID }, { $set: updateOps })
            .exec()
            .then((result) => {
                if (result.nModified >= 1) {
                    res.status(200).json({
                        msg: 'Order updated successfully.',
                        request: {
                            type: 'GET',
                            url: `http://${process.env.HOST}:${process.env.PORT}/orders/${orderID}`
                        }
                    });
                } else if (result.n === 1) {
                    res.status(404).json({
                        msg: 'No change in order.'
                    });
                } else {
                    res.status(404).json({
                        msg: 'No valid entry found.'
                    });
                }
            })
            .catch((e) => {
                res.status(500).json({ error: 'Internal server error.' });
            });
    },
    deleteOrder(req, res) {
        const { orderID } = req.params;
        Order.deleteOne({ _id: orderID })
            .exec()
            .then((result) => {
                if (result.deletedCount >= 1) {
                    res.status(200).json({
                        msg: 'Order deleted successfully.',
                        request: {
                            type: 'GET',
                            url: `http://${process.env.HOST}:${process.env.PORT}/orders`
                        }
                    });
                } else {
                    res.status(404).json({
                        msg: 'Failed to delete order. Please make sure provide a correct orderID.'
                    });
                }
            })
            .catch((e) => res.status(500).json({ error: 'Internal server error.' }));
    }
};

module.exports = orderController;
