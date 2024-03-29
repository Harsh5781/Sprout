const express = require('express')
const router = express.Router()

const auth = require('../utils/auth')

const cartController = require('../controllers/cart')

router.route('/')
.get(auth, cartController.getCart)

router.route('/product/:id')
.post(auth, cartController.addToCart)

router.route('/:cartId/item/:itemId')
.delete(auth, cartController.deleteItem)

router.route('/:cartId/item/:itemId/increase')
.post(auth, cartController.increseQuantityInCart)

router.route('/:cartId/item/:itemId/decrease')
.delete(auth, cartController.decreaseQuantityInCart)

router.route('/:cartId')
.delete(auth, cartController.deleteCart)

module.exports = router