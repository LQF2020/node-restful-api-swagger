const mongoose = require('mongoose');
const Product = require('../db/model/product');

const productController = {
    getAllProducts(req, res) {
        Product.find()
            .select('-__v')
            .exec()
            .then((docs) => {
                const response = {
                    count: docs.length,
                    products: docs.map((item) => {
                        return {
                            _id: item._id,
                            name: item.name,
                            price: item.price,
                            request: {
                                type: 'GET',
                                url: `http://127.0.0.1:3000/products/${item._id}`
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
    getProduct(req, res) {
        const { productID } = req.params;
        Product.findById(productID)
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
    createProduct(req, res) {
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price,
            imgURL: req.file.path
        });
        console.log(req.file);

        product
            .save()
            .then((result) => {
                res.status(201).json({
                    msg: `New product created.`,
                    createdProduct: {
                        _id: result._id,
                        name: result.name,
                        price: result.price,
                        request: {
                            type: 'GET',
                            url: `http://127.0.0.1:3000/products/${result._id}`
                        }
                    }
                });
            })
            .catch((e) =>
                res.status(500).json({
                    error: e
                })
            );
    },
    updateProduct(req, res) {
        const { productID } = req.params;
        const updateOps = req.body;
        Product.update({ _id: productID }, { $set: updateOps })
            .exec()
            .then((result) => {
                console.log(result);
                res.status(200).json({
                    msg: 'Product updated successfully.',
                    request: { type: 'GET', url: `http://127.0.0.1:3000/products/${productID}` }
                });
            })
            .catch((e) => {
                res.status(500).json({ error: e });
            });
    },
    deleteProduct(req, res) {
        const { productID } = req.params;
        Product.remove({ _id: productID })
            .exec()
            .then((result) => {
                if (result.deletedCount >= 1) {
                    res.status(200).json({
                        msg: 'Product deleted successfully.',
                        request: { type: 'GET', url: `http://127.0.0.1:3000/products` }
                    });
                } else {
                    res.status(404).json({
                        msg:
                            'Failed to delete product. Please make sure provide a correct productID.'
                    });
                }
            })
            .catch((e) => res.status(500).json({ error: e }));
    }
};

module.exports = productController;
