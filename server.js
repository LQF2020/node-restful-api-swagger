require('dotenv').config();
const http = require('http');
require('./db/connect').dbConn();
const app = require('./app');
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'http://127.0.0.1';
const server = http.createServer(app);

server.listen(port);
console.log(` Access API on ${host}:${port}/api-docs`);
