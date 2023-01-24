const express = require('express')
const router = express.Router()

const {genHash, checkPass} = require('../utils/genPass')
const auth = require('../utils/auth')

const userController = require('../controllers/user')

router.route('/register')
.post(genHash, userController.registerUser)

router.route('/login')
.post(checkPass, userController.loginUser)

router.route('/logout')
.post(auth, userController.logoutUser)

module.exports = router