const express = require('express');
const router = express.Router();
const productController = require( '../controller/productController' );

router.post('/', productController.createProduct);
router.get('/', productController.getAll);
router.get('/:id', productController.detail);
router.delete('/:id', productController.delete);

module.exports = router;