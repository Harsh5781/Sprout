const express = require('express')
const router = express.Router()

const auth = require('../utils/auth')

const plantController = require('../controllers/plant')

router.route('/')
.get(plantController.getPlantByName)

router.route('/:id')
.get(plantController.getPlantById)
.post(auth, plantController.addPlantById)

module.exports = router
