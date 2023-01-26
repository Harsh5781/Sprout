const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order')

router.route('/:id').
get(orderController.getOrder)

module.exports = router;