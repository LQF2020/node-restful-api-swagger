var http = require("http");
var app = require("./app");
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log(` The server is running on http://127.0.0.1:${port}`);
