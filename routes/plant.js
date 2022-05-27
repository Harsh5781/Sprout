const express = require('express')
const router = express.Router()

const Plant = require('../model/plants')
const Garden = require('../model/zenGarden')
const User = require('../model/userSchema')
const auth = require('../utils/auth')

router.route('/')
.get(async (req, res)=>{
    try{
        const search = req.query.name
        const plants = await Plant.find({
            name:{$regex: search, $options: '$i'}
        })

        res.status(200).json(plants)
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)
    }
})

router.route('/:id')
.get(async (req, res)=>{
    const {id} = req.params
    const plant = await Plant.findById(id)
    res.status(200).json(plant)
})
.post(auth, async (req, res)=>{
    try{
        const user = await User.findById(req.user.id)
        const plant = await Plant.findById(req.params.id)
        const garden = new Garden(plant)
        user.plants.push(garden.id)
        garden.isNew = true
        await garden.save()
        await user.save()
        res.status(200).json(user)
    }
    catch(err){
        res.status(400).json(err)
    }
})

module.exports = router
