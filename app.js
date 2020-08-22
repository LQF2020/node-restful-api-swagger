const express = require("express");
const myLogger = require("./logger");
var app = express();

app.use(myLogger);
app.use((req, res, next) => {
	var data = { type: "string", msg: "it works right ? !" };
	res.status(200).send(data);
});

module.exports = app;
