const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../../controllers/product');

router.get('/', getAllProducts);
router.get('/:productID', getProduct);
router.post('/', createProduct);
router.patch('/:productID', updateProduct);
router.delete('/:productID', deleteProduct);

module.exports = router;
