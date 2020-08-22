const express = require("express");
const myLogger = require("./logger");
const app = express();

// router files
var productRouter = require("./api/router/products");

app.use(myLogger);
app.use("/products", productRouter);

module.exports = app;
