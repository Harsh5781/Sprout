const User = require('../model/userSchema')
const {verifyToken} = require('./getToken')

const adminAuth = async (req, res, next)=>{
    try{
        const token = req.headers['auth-token']
        const verify = verifyToken(token)
        const user = await User.findById(verify.id)
        if(!user.isAdmin){
            res.status(401).json({"message" : "Admin not authorized"})
        }
        req.user = user
        req.token = cookie
        next()
    }
    catch(e){
        console.log(e)
        res.status(401).json({"message":"Not authenticated"})
    }
}

module.exports = adminAuth