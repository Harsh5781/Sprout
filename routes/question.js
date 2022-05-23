const express = require('express')
const router = express.Router()

const User = require('../model/userSchema')
const Question = require('../model/question')
const auth = require('../utils/auth')

router.route('/')
.get(async (req, res)=>{
    const question = await Question.find()
    res.status(200).json(question)
})
.post(auth, async (req,res)=>{
    try{
    const {title, body} = req.body
    const user = await User.findById(req.user.id)
    const question = new Question({title, body, user})
    await question.save()
    res.status(200).json(question)
    }
    catch(err){
        console.log(err)
        res.json(err)
    }
})

router.route('/:id')
.get(async (req, res)=>{
    const question = await Question.findById(req.params.id).populate('user').populate('comments')
    res.json(question)
})
.delete(auth, async (req, res)=>{
    const question = await Question.findByIdAndDelete(req.params.id)
    res.json({"message": "Deleted successfully"})
})


module.exports = router