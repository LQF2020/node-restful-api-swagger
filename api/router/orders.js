const express = require("express");
const router = express.Router();

var checkUserInput = (req, res, next) => {
	let orderID = req.params.orderID;
	if (!/^\d+$/.test(orderID)) res.status(404).json({ method: `${req.method}`, msg: "The resource can not be found." });
	else next();
};
router.get("/", function (req, res) {
	res.status(200).json({ method: `${req.method}`, msg: "Get all orders." });
});
router.get("/:orderID", checkUserInput, function (req, res) {
	let orderID = req.params.orderID;
	res.status(200).json({ method: `${req.method}`, msg: `Get the order No ${orderID}.` });
});
router.post("/", function (req, res) {
	res.status(201).json({ method: `${req.method}`, msg: "Create a new order." });
});
router.put("/:orderID", checkUserInput, function (req, res) {
	let orderID = req.params.orderID;
	res.status(200).json({ method: `${req.method}`, msg: `Update the order No ${orderID}.` });
});
router.delete("/:orderID", checkUserInput, function (req, res) {
	let orderID = req.params.orderID;
	res.status(200).json({ method: `${req.method}`, msg: `Delete the order No ${orderID}.` });
});

module.exports = router;
