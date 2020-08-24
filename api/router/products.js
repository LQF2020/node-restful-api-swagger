const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../../db/model/product');

const checkUserInput = (req, res, next) => {
    const { productID } = req.params;
    if (!/^\d+$/.test(productID))
        res.status(404).json({ method: `${req.method}`, msg: 'The resource can not be found.' });
    else next();
};

router.get('/', function (req, res) {
    res.status(200).json({ method: `${req.method}`, msg: 'Get all products.' });
});
router.get('/:productID', checkUserInput, function (req, res) {
    const { productID } = req.params;
    res.status(200).json({ method: `${req.method}`, msg: `Get the product No ${productID}.` });
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
            res.status(400).json({
                msg: `Failed to create product.`,
                error: e,
            })
        );
});

router.put('/:productID', checkUserInput, function (req, res) {
    const { productID } = req.params;
    res.status(200).json({ method: `${req.method}`, msg: `Update the product No ${productID}.` });
});
router.delete('/:productID', checkUserInput, function (req, res) {
    const { productID } = req.params;
    res.status(200).json({ method: `${req.method}`, msg: `Delete the product No ${productID}.` });
});

module.exports = router;
