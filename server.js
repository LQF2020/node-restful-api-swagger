require('dotenv').config();
const http = require('http');
require('./db/connect').dbConn();
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);
console.log(` Access API on http://127.0.0.1:${port}/api-docs`);
