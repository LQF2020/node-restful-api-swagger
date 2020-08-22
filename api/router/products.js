const express = require("express");
const router = express.Router();

var checkUserInput = (req, res, next) => {
	let orderID = req.params.orderID;
	if (!/^\d+$/.test(orderID)) res.status(404).json({ method: `${req.method}`, msg: "The resource can not be found." });
	else next();
};

router.get("/", function (req, res) {
	res.status(200).json({ method: `${req.method}`, msg: "Get all products." });
});
router.get("/:productID", checkUserInput, function (req, res) {
	let productID = req.params.productID;
	res.status(200).json({ method: `${req.method}`, msg: `Get the product No ${productID}.` });
});

router.post("/", function (req, res) {
	console.log(req.body);
	let product = {
		name: req.body.name,
		price: req.body.price,
	};

	res.status(201).json({ method: `${req.method}`, msg: "Create a new product.", createdProduct: product });
});

router.put("/:productID", checkUserInput, function (req, res) {
	let productID = req.params.productID;
	res.status(200).json({ method: `${req.method}`, msg: `Update the product No ${productID}.` });
});
router.delete("/:productID", checkUserInput, function (req, res) {
	let productID = req.params.productID;
	res.status(200).json({ method: `${req.method}`, msg: `Delete the product No ${productID}.` });
});

module.exports = router;
