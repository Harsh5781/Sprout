const express = require('express');
const router = express.Router();

const Shop = require('../model/shop');

const shopController = require('../controllers/shop')

router.route('/').
get(shopController.getAllProducts)

router.route('/category/:category').
get(shopController.getProductByCategory)

router.route('/:id').
get(shopController.getProductById)

module.exports = router;