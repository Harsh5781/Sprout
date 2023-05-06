const mongoose = require('mongoose')
const {Schema} = mongoose

const User = require('./userSchema')

const blogSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    // image:{
    //     type:String
    // }
})

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog