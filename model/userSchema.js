const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema =new Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    email:{
        type:String,
        unique: true,
        required: true
    },
    isAdmin:{
        type:Boolean,
        required: true,
        default: false
    },
    password:{
        type:String,
        required:true
    },
    tokens:[{
        type:String
    }],
    plants:[{
        type: Schema.Types.ObjectId,
        ref: 'Garden'
    }],
    blogs:[{
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }],
    savedBlogs:[{
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }],
    cart : {
        type : Schema.Types.ObjectId,
        ref : 'Cart'
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User