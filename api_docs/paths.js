const User = require('./routes/user');
const Product = require('./routes/product');
const Order = require('./routes/order');
module.exports = {
    '/user/signup': User.signup,
    '/user/login': User.login,

    '/products': Product.get_post,

    '/products/{productID}': Product.get_patch_delete,

    '/orders': Order.get_post,
    '/orders/{orderID}': Order.get_patch_delete
};
