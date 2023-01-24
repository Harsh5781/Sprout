const express = require('express')
const router = express.Router()

const auth = require('../utils/auth')

const profileController = require('../controllers/profile')

// Profile
router.route('/')
.get(auth, profileController.getUser)

// My blogs
router.route('/myblogs')
.get(auth, profileController.getAllBlogs)

router.route('/myblogs/:blogId')
.get(auth, profileController.getBlogById)
.delete(auth, profileController.deleteBlogById)

// Saved blogs
router.route('/savedblogs')
.get(auth, profileController.getAllSavedBlogs)

router.route('/savedblogs/:blogId')
.get(auth, profileController.getSavedBlogById)
.delete(auth, profileController.deleteSavedBlogById)


// My Garden
router.route('/mygarden')
.get(auth, profileController.getAllPlants)

router.route('/mygarden/:plantId')
.get(auth, profileController.getPlantsById)
.delete(auth, profileController.deletePlantsById)

module.exports = router