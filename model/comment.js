const mongoose = require('mongoose')
const {Schema} = mongoose
const User = require('./userSchema')

const commentSchema = new Schema({
    body:{
        type:String,
        required:true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: User
    },
    time:{
        type:Date,
        default: Date.now
    }
})

const Comment = new mongoose.model('Comment', commentSchema)
module.exports = Comment