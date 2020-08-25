const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../../db/model/product');

router.get('/', function (req, res) {
    Product.find()
        .exec()
        .then((docs) => {
            res.status(200).json({
                createdProductList: docs,
            });
        })
        .catch((e) =>
            res.status(500).json({
                error: e,
            })
        );
});
router.get('/:productID', function (req, res) {
    const { productID } = req.params;
    Product.findById(productID)
        .exec()
        .then((doc) => {
            if (doc) {
                res.status(200).json({
                    createdProduct: doc,
                });
            } else {
                res.status(404).json({
                    msg: 'No valid entry found.',
                });
            }
        })
        .catch((e) =>
            res.status(500).json({
                error: e,
            })
        );
});

router.post('/', function (req, res) {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
    });
    product
        .save()
        .then((result) =>
            res.status(201).json({
                msg: `New product created.`,
                createdProduct: result,
            })
        )
        .catch((e) =>
            res.status(500).json({
                error: e,
            })
        );
});

router.patch('/:productID', function (req, res) {
    const { productID } = req.params;
    const updateOps = req.body;
    Product.update({ _id: productID }, { $set: updateOps })
        .exec()
        .then((result) => {
            res.status(200).json({ updatedProduct: result });
        })
        .catch((e) => {
            res.status(500).json({ error: e });
        });
});
router.delete('/:productID', function (req, res) {
    const { productID } = req.params;
    Product.remove({ _id: productID })
        .exec()
        .then((result) => {
            if (result) {
                res.status(200).json({ deletedProduct: result });
            } else {
                res.status(404).json({
                    msg: 'No valid entry found.',
                });
            }
        })
        .catch((e) => res.status(500).json({ error: e }));
});

module.exports = router;
