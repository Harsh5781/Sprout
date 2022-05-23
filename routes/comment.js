const express = require('express')
const router = express.Router()

const User = require('../model/userSchema')
const Question = require('../model/question')
const Comment = require('../model/comment')
const auth = require('../utils/auth')

router.route('/:id')
.post(auth, async (req,res)=>{
    try{
    const {body} = req.body
    const question = await Question.findById(req.params.id)
    const user = await User.findById(req.user.id)
    const comment = new Comment({body, user})
    question.comments.push(comment.id)
    await comment.save()
    await question.save()
    res.status(200).json(comment)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})



module.exports = router