const express = require('express');
const router = express.Router();
const formParser = require('../../middlewares/formParser');
const {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../../controllers/product');

router.get('/', getAllProducts);
router.get('/:productID', getProduct);
router.post('/', formParser.single('productImage'), createProduct);
router.patch('/:productID', updateProduct);
router.delete('/:productID', deleteProduct);

module.exports = router;
