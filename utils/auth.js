const User = require('../model/userSchema')
const {verifyToken} = require('./getToken')

const auth = async (req, res, next)=>{
    try{
        const token = req.headers['auth-token']
        const verify = verifyToken(token)
        const user = await User.findById(verify.id)
        if(!user.tokens.includes(token)){
            throw "Not authenticated"
        }
        req.user = user
        req.token = token
        next()
    }
    catch(err){
        console.log(err)
        res.status(401).json({"message":"Not authenticated"})
    }
}
module.exports = auth