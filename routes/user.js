const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const {genHash, checkPass} = require('../utils/genPass')
const auth = require('../utils/auth')

const cookie = require('cookie-parser')
const User= require('../model/userSchema')

router.route('/register')
.get((req, res, next)=>{
    res.send('hello')
})
.post(genHash, async (req, res)=>{
    const user = req.user
    console.log(user)
    res.status(200).json({
        "message":"Register successful",
        "token":user.email
    })
})

router.route('/login')
.post(checkPass, (req, res)=>{
    const user = req.user
    res.status(200).json({
        "message":"Login successful",
        "token":user.email
    })
})

router.route('/logout')
.post(auth, async (req, res)=>{
    try{
    res.clearCookie('jwt')
    }
    catch(er)
    {
        res.json("Cookie not deleted")
    }
    req.user.tokens = req.user.tokens.filter((elem)=>{
        return elem.token !== req.token
    })
    req.user.save()
    res.status(200).json({"message":"Logout successful"})
})


module.exports = router