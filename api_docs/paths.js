const User = require('./routes/user');
const Product = require('./routes/product');
const Order = require('./routes/order');
module.exports = {
    '/user/signup': User.signup,
    '/user/login': User.login,

    '/products': Product.getAllProducts,
    '/products?accessToken={token}': Product.createProduct,
    '/products/{productID}': Product.getProductById,
    '/products/{productID}?accessToken={token}': Product.update_and_delete,

    '/orders': Order.getAllOrders,
    '/orders?accessToken={token}': Order.createOrder,
    '/orders/{orderID}': Order.getOrderById,
    '/orders/{orderID}?accessToken={token}': Order.update_and_delete
};
