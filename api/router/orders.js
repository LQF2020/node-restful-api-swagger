const express = require('express');
const router = express.Router();

const checkUserInput = (req, res, next) => {
  const { orderID } = req.params;
  if (!/^\d+$/.test(orderID))
    res.status(404).json({ method: `${req.method}`, msg: 'The resource can not be found.' });
  else next();
};
router.get('/', function (req, res) {
  res.status(200).json({ method: `${req.method}`, msg: 'Get all orders.' });
});
router.get('/:orderID', checkUserInput, function (req, res) {
  const { orderID } = req.params;
  res.status(200).json({ method: `${req.method}`, msg: `Get the order No ${orderID}.` });
});
router.post('/', function (req, res) {
  const order = {
    productID: req.body.productId,
    quantity: req.body.quantity,
  };
  res.status(201).json({
    method: `${req.method}`,
    msg: 'Create a new order.',
    createdOrder: order,
  });
});
router.put('/:orderID', checkUserInput, function (req, res) {
  const { orderID } = req.params;
  res.status(200).json({ method: `${req.method}`, msg: `Update the order No ${orderID}.` });
});
router.delete('/:orderID', checkUserInput, function (req, res) {
  const { orderID } = req.params;
  res.status(200).json({ method: `${req.method}`, msg: `Delete the order No ${orderID}.` });
});

module.exports = router;
