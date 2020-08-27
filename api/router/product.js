const express = require('express');
const router = express.Router();
const formParser = require('../../middlewares/formParser');
const checkAuth = require('../../middlewares/checkAuth');
const {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../../controllers/product');

router.get('/', getAllProducts);
router.get('/:productID', getProduct);
router.post('/', checkAuth, formParser.single('productImage'), createProduct);
router.patch('/:productID', checkAuth, updateProduct);
router.delete('/:productID', checkAuth, deleteProduct);

module.exports = router;
