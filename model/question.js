const mongoose = require('mongoose')
const {Schema} = mongoose

const questionSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    body:{
        type:String,
        required:true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments:[{
        type:Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    time:{
        type:Date,
        default: Date.now
    }
})

const Question = mongoose.model('Question', questionSchema)
module.exports = Question