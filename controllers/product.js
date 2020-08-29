const mongoose = require('mongoose');
const Product = require('../db/model/product');

const productController = {
    getAllProducts(req, res) {
        Product.find()
            .select('-__v')
            .exec()
            .then((items) => {
                const response = {
                    count: items.length,
                    products: items.map((item) => {
                        return {
                            _id: item._id,
                            name: item.name,
                            price: item.price,
                            imgURL: item.imgURL,
                            request: {
                                type: 'GET',
                                url: `${process.env.BASE_URL}/products/${item._id}`
                            }
                        };
                    })
                };
                res.status(200).json(response);
            })
            .catch((e) => res.status(500).json({ error: 'Internal server error.' }));
    },

    getProduct(req, res) {
        const { productID } = req.params;
        Product.findById(productID)
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
    createProduct(req, res) {
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price,
            imgURL: `${process.env.BASE_URL}/uploads/productImages/${req.file.filename}`
        });

        product
            .save()
            .then((item) => {
                res.status(201).json({
                    msg: `New product created.`,
                    createdProduct: {
                        _id: item._id,
                        name: item.name,
                        price: item.price,
                        imgURL: item.imgURL,
                        request: {
                            type: 'GET',
                            url: `${process.env.BASE_URL}/products/${item._id}`
                        }
                    }
                });
            })
            .catch((e) => res.status(500).json({ error: 'Internal server error.' }));
    },
    updateProduct(req, res) {
        const { productID } = req.params;
        const updateOps = req.body;
        Product.update({ _id: productID }, { $set: updateOps })
            .exec()
            .then((result) => {
                res.status(200).json({
                    msg: 'Product updated successfully.',
                    request: { type: 'GET', url: `${process.env.BASE_URL}/products/${productID}` }
                });
            })
            .catch((e) => {
                res.status(500).json({ error: 'Internal server error.' });
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
                        request: { type: 'GET', url: `${process.env.BASE_URL}/products` }
                    });
                } else {
                    res.status(404).json({
                        msg:
                            'Failed to delete product. Please make sure provide a correct productID.'
                    });
                }
            })
            .catch((e) => res.status(500).json({ error: 'Internal server error.' }));
    }
};

module.exports = productController;
