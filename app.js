const express = require("express");
var app = express();
app.use((req, res, next) => {
	var data = { type: "string", msg: "it works right ? !" };
	res.status(200).send(data);
});

module.exports = app;
