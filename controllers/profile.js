const Plant = require('../model/plants')
const Blog = require('../model/blog')
const User = require('../model/userSchema')

//Profile
exports.getUser = async (req, res)=>{
    const user = await User.findById(req.user.id)
    res.status(200).json(user)
}

//MyBlogs
exports.getAllBlogs = async (req, res)=>{
    const user = await User.findById(req.user.id).populate('blogs')
    res.status(200).json(user.blogs)
}

exports.getBlogById = async (req, res)=>{
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
}

exports.deleteBlogById = async (req, res)=>{
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
}

exports.getAllSavedBlogs = async (req, res)=>{
    const user = await User.findById(req.user.id).populate('savedBlogs')
    res.status(200).json(user.savedBlogs)
}

exports.getSavedBlogById = async (req, res)=>{
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
}

exports.deleteSavedBlogById = async (req, res)=>{
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
}

//Garden
exports.getAllPlants = async (req, res)=>{
    const user = await User.findById(req.user.id).populate('plants')
    res.status(200).json(user.plants)
}

exports.getPlantsById  = async (req, res)=>{
    try{
        const user = await User.findById(req.user.id).populate('plants')
        let id 
        user.plants.forEach(plant =>{
            if(req.params.plantId == plant.id){
                id = plant.id
            }
        })
        if(id == null){
            throw "Plant not found"
        }
        const plant = await Plant.findById(id)
        res.status(200).json(plant)
    }
    catch(error){
        console.log(error)
        res.status(404).json({"message": error})
    }
}

exports.deletePlantsById  = async (req, res)=>{
    try{
        const user = await User.findById(req.user.id).populate('plants')
        let id 
        user.plants.forEach(plant =>{
            if(req.params.plantId == plant.id){
                id = plant.id
            }
        })
        if(id == null){
            throw "Plant not found"
        }
        user.plants = user.plants.filter(plant=>{
            return plant.id !== id
        })
        await user.save()
        res.status(200).json({"message":"Deleted successfully"})
    }
    catch(error){
        console.log(error)
        res.status(404).json({"message" : error})
    }
}