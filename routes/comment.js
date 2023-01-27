const express = require('express')
const router = express.Router()

const auth = require('../utils/auth')

const commentController = require('../controllers/comment')

router.route('/:id')
.post(auth, commentController.postComment)

module.exports = router