require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api_docs/swagger.js');

const { dbConn } = require('./db/connect');

dbConn();

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

// parser urlencoded body, like "form"
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
// parser content-type:application/json
app.use(bodyParser.json());

// cors enabling
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Headers', 'Content-type');
    if (req.method === 'OPTIONS') {
        res.append('Access-Allow-Control-Methods', 'PUT,DELETE,POST,PATCH,GET');
        res.sendStatus(200);
    } else {
        next();
    }
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// router files
const productRouter = require('./api/router/product');
const orderRouter = require('./api/router/order');
const userRouter = require('./api/router/user');

app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/user', userRouter);
// No route found error handler
app.use((req, res, next) => {
    const error = new Error('Not Found.');
    error.status = 404;
    next(error);
});

// Handle all errors, including DB connection error, api error...
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: err.message
    });
});

module.exports = app;
