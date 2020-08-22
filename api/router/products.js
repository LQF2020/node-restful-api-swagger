const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
	res.status(200).json({ method: `${req.method}`, msg: "Get all products." });
});
router.get("/:productID", function (req, res) {
	let productID = req.params.productID;
	res.status(200).json({ method: `${req.method}`, msg: `Get the product No ${productID}.` });
});
router.post("/", function (req, res) {
	res.status(200).json({ method: `${req.method}`, msg: "Create a new product." });
});
router.put("/:productID", function (req, res) {
	let productID = req.params.productID;
	res.status(200).json({ method: `${req.method}`, msg: `Update the product No ${productID}.` });
});
router.delete("/:productID", function (req, res) {
	let productID = req.params.productID;
	res.status(200).json({ method: `${req.method}`, msg: `Delete the product No ${productID}.` });
});

module.exports = router;
