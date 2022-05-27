const express = require('express')
const router = express.Router()

const Plant = require('../model/plants')
const Garden = require('../model/zenGarden')
const Blog = require('../model/blog')
const User = require('../model/userSchema')
const auth = require('../utils/auth')

// Profile
router.route('/')
.get(auth, async (req, res)=>{
    const user = await User.findById(req.user.id)
    res.status(200).json(user)
})

// My blogs
router.route('/myblogs')
.get(auth, async (req, res)=>{
    const user = await User.findById(req.user.id).populate('blogs')
    res.status(200).json(user.blogs)
})

router.route('/myblogs/:blogId')
.get(auth, async (req, res)=>{
    const user = await User.findById(req.user.id).populate('blogs')
    let id 
    for(let blog of user.blogs)
    {
        if(blog.id === req.params.blogId)
        {
            id = blog.id
            break
        }
    }
    if(!id){
        return res.status(404).send("Blog not found")
    }
    const blog = await Blog.findById(id)
    res.status(200).json(blog)
})
.delete(auth, async (req, res)=>{
    const user = await User.findById(req.user.id).populate('blogs')
    let id 
    for(let blog of user.blogs)
    {
        if(blog.id === req.params.blogId)
        {
            id = blog.id
            break
        }
    }
    if(!id){
        return res.status(404).json({"message" : "Blog not found"})
    }
    user.blogs = user.blogs.filter((elem)=>{
        return elem.id !== id
    })
    await user.save()
    const blog = await Blog.findByIdAndDelete(id)
    res.status(200).json({"message": "Deleted successfully"})
})

// Saved blogs
router.route('/savedblogs')
.get(auth, async (req, res)=>{
    const user = await User.findById(req.user.id).populate('savedBlogs')
    res.status(200).json(user.savedBlogs)
})

router.route('/savedblogs/:blogId')
.get(auth, async (req, res)=>{
    const user = await User.findById(req.user.id).populate('savedBlogs')
    let id 
    for(let blog of user.savedBlogs)
    {
        if(blog.id === req.params.blogId)
        {
            id = blog.id
            break
        }
    }
    if(!id){
        return res.status(404).json({"message": "Blog not found"})
    }
    const blog = await Blog.findById(id)
    res.status(200).json(blog)
})
.delete(auth, async (req, res)=>{
    const user = await User.findById(req.user.id).populate('savedBlogs')
    let id 
    for(let blog of user.savedBlogs)
    {
        if(blog.id === req.params.blogId)
        {
            id = blog.id
            break
        }
    }
    if(!id){
        return res.status(404).json({"message" :"Blog not found"})
    }
    user.savedBlogs = user.savedBlogs.filter((elem)=>{
        return elem.id !== id
    })
    await user.save()
    res.status(200).json({"message": "Deleted successfully"})
})


// My Garden
router.route('/mygarden')
.get(auth, async (req, res)=>{
    const user = await User.findById(req.user.id).populate('plants')
    res.status(200).json(user.plants)
})

router.route('/mygarden/:plantId')
.get(auth, async (req, res)=>{
    const user = await User.findById(req.user.id).populate('plants')
    let id 
    for(let plant of user.plants)
    {
        if(plant.id === req.params.plantId)
        {
            id = plant.id
            break
        }
    }
    if(!id){
        return res.status(404).json({"message":"Plant not found"})
    }
    const plant = await Garden.findById(id)
    res.status(200).json(plant)
})
.delete(auth, async (req, res)=>{
    const user = await User.findById(req.user.id).populate('plants')
    let id 
    for(let plant of user.plants)
    {
        if(plant.id === req.params.plantId)
        {
            id = plant.id
            break
        }
    }
    if(!id){
        return res.status(404).json({"message":"Plant not found"})
    }
    user.plants = user.plants.filter((elem)=>{
        return elem.id !== id
    })
    await user.save()
    const plant = await Garden.findByIdAndDelete(id)
    res.status(204).json({"message":"Deleted successfully"})
})

module.exports = router