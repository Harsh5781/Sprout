const User = require('../model/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const {getToken} = require('./getToken')

// Setting up bcrypt

const genHash = async function(req, res, next){
    try{
        const {password, email, username} = req.body
        const pass = await bcrypt.hash(password, 12)
        const user = new User({email,  password: pass, username})
        const token = getToken(user.id)
        user.tokens = user.tokens.concat({token})
        await user.save()
        req.user = user
        req.token = token
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 1000*60*60*24*3),
            httpOnly: false
        })
        next()
    }
    catch(err){
        res.status(400).json({
            "message":"Something went wrong"
        })
    }
}

const checkPass = async function(req, res, next){
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})
        console.log(user)
        if(!email)
        {
            return res.status(404).json({"message":'Incorrect user details'})
        }
        const verify = await bcrypt.compare(password, user.password)
        if(!verify){
            return res.status(403).json({"message":'Incorrect user details'})
        }
        const token = getToken(user.id)
        user.tokens = user.tokens.concat({token})
        await user.save()
        req.user = user
        req.token = token
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 1000*60*60*24*3),
            httpOnly: false
        })
        next()
    }
    catch(err){
        console.log(err)
        res.status(400).json({"message":"Something went wrong"})
    }
}

module.exports.genHash = genHash
module.exports.checkPass = checkPass