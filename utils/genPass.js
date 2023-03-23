const User = require('../model/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const {getToken} = require('./getToken')

// Setting up bcrypt

const genHash = async function(req, res, next){
    try{
        const {password, email, username, isAdmin} = req.body
        const pass = await bcrypt.hash(password, 12)
        const user = new User({email,  password: pass, username, isAdmin})
        const token = getToken(user.id)
        user.tokens = user.tokens.concat({token})
        await user.save()
        req.user = user
        req.token = token
        res.setHeader('Auth-token', token)
        next()
    }
    catch(err){
        console.log(err)
        res.status(400).json({
            "message":"Something went wrong"
        })
    }
}

const checkPass = async function(req, res, next){
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})
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
        res.setHeader('Auth-token', token)
        next()
    }
    catch(err){
        console.log(err)
        res.status(400).json({"message":"Something went wrong"})
    }
}

module.exports.genHash = genHash
module.exports.checkPass = checkPass