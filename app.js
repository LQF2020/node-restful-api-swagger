const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

// const myLogger = require("./logger");
// app.use(myLogger);

// Dev logging for incoming requests
app.use(morgan("dev"));

// parser urlencoded body, like "form"
app.use(bodyParser.urlencoded({ extended: false }));
// parser content-type:application/json
app.use(bodyParser.json());

// router files
var productRouter = require("./api/router/products");
var orderRouter = require("./api/router/orders");

app.use("/products", productRouter);
app.use("/orders", orderRouter);

// No route found error handler
app.use((req, res, next) => {
	const error = new Error("Not Found.");
	error.status = 404;
	next(error);
});

// Handle all errors, including DB connection error, api error...
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		errCode: err.status,
		error: err.message,
	});
});

module.exports = app;
