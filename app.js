const express = require("express");
const morgan = require("morgan");
const app = express();

// const myLogger = require("./logger");
// app.use(myLogger);

// Dev logging for incoming requests
app.use(morgan("dev"));

// router files
var productRouter = require("./api/router/products");
var orderRouter = require("./api/router/orders");

app.use("/products", productRouter);
app.use("/orders", orderRouter);
module.exports = app;
