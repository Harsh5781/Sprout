const cookie = require('cookie-parser')
const User = require('../model/userSchema')
const {verifyToken} = require('./getToken')

const auth = async function(req, res, next){
    try{
    const token = req.body.data
    const verify = verifyToken(token)
    const user = await User.findOne({id: verify})
    req.user = user
    req.token = token
    next()
    }
    catch(err){
        console.log(err)
        res.status(401).json({"message":"Something went wrong"})
    }
}
module.exports = auth