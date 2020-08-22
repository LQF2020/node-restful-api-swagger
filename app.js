const express = require("express");
const myLogger = require("./logger");
const app = express();

// router files
var productRouter = require("./api/router/products");
var orderRouter = require("./api/router/orders");
app.use(myLogger);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
module.exports = app;
