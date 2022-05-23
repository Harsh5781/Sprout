const express = require('express')
const router = express.Router()

const User = require('../model/userSchema')
const Blog = require('../model/blog')
const auth = require('../utils/auth')

router.route('/')
.get(async (req, res)=>{
    const blogs = await Blog.find().populate('user')
    res.json(blogs)
})
.post(auth, async (req,res)=>{
    const {title, body} = req.body
    const user = await User.findById(req.user.id)
    const blog = new Blog({title, body, user})
    user.blogs.push(blog.id)
    await blog.save()
    await user.save()
    res.json(blog)
})

router.route('/:id')
.get(async (req,res)=>{
    const blog = await Blog.findById(req.params.id).populate('user')
    res.json(blog)
})
.post(auth, async (req,res)=>{
    const blog = await Blog.findById(req.params.id)
    const user = await User.findById(req.user.id)
    user.savedBlogs.push(blog.id)
    await user.save()
    res.json(user)
})

module.exports = router