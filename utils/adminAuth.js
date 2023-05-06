const User = require('../model/userSchema')
const {verifyToken} = require('./getToken')

const adminAuth = async (req, res, next)=>{
    try{
        const token = req.headers['auth-token']
        const verify = verifyToken(token)
        const user = await User.findById(verify.id)
        if(!user.tokens.includes(token)){
            throw "Not authenticated"
        }
        if(!user.isAdmin){
            throw "Admin not authorized"
        }
        req.user = user
        req.token = cookie
        next()
    }
    catch(e){
        console.log(e)
        res.status(401).json({"message": e})
    }
}

module.exports = adminAuth