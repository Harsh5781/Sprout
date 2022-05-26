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
    res.json({"message":"Register successful"})
})

router.route('/login')
.post(checkPass, (req, res)=>{
    res.json({"message":"Login successful"})
})

router.route('/logout')
.get(auth, async (req, res)=>{
    res.clearCookie('jwt')
    req.user.tokens = req.user.tokens.filter((elem)=>{
        return elem.token !== req.token
    })
    req.user.save()
    res.json({"message":"Logout successful"})
})


module.exports = router