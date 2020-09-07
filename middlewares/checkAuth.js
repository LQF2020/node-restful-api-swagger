const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userData = decoded;

        // The product/order Handler should assign different authority based on userData.email
        next();
    } catch (e) {
        res.status(401).json({
            msg: 'Auth failed because of an missing token or invalid token received.'
        });
    }
};

module.exports = checkAuth;
