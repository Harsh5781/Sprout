const User = require('../model/userSchema')
const Question = require('../model/question')
const Comment = require('../model/comment')

exports.postComment = async (req,res)=>{
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
        res.json(err)
    }
}