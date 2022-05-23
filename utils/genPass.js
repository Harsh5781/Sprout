const User = require('../model/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const {getToken} = require('./getToken')

// Setting up bcrypt

const genHash = async function(req, res, next){
    try{
        const {password, email, confirmPass, username} = req.body
        // if(confirmPass!==password)
        // {
        //     return res.status(400).redirect('/user/register')
        // }
        const pass = await bcrypt.hash(password, 12)
        const user = new User({email,  password: pass, username})
        const token = getToken(user.id)
        user.tokens = user.tokens.concat({token})
        await user.save()
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 1000*60*60*24*3),
            httpOnly: true
        })
        next()
    }
    catch(err){
        console.log(err)
        res.status(400).send(err)
    }
}

const checkPass = async function(req, res, next){
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!email)
        {
            return res.status(404).send('Incorrect user details')
        }
        const verify = await bcrypt.compare(password, user.password)
        if(!verify){
            return res.status(403).send('Incorrect user details')
        }
        const token = getToken(user.id)
        user.tokens = user.tokens.concat({token})
        await user.save()
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + 1000*60*60*24*3),
            httpOnly: true
        })
        next()
    }
    catch(err){
        res.status(400).send(err)
    }
}

module.exports.genHash = genHash
module.exports.checkPass = checkPass