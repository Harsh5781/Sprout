const cookie = require('cookie-parser')
const User = require('../model/userSchema')
const {verifyToken} = require('./getToken')

const auth = async function(req, res, next){
    try{
    const token = req.cookies.jwt
    const verify = verifyToken(token)
    const user = await User.findOne({id: verify})
    req.user = user
    req.token = token
    next()
    }
    catch(err){
        console.log(err)
        res.status(401).send(err)
    }
}
module.exports = auth