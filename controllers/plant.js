const Plant = require('../model/plants')
const User = require('../model/userSchema')

exports.getPlantByName = async (req, res)=>{
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
}

exports.getPlantById = async (req, res)=>{
    const {id} = req.params
    const plant = await Plant.findById(id)
    res.status(200).json(plant)
}

exports.addPlantById = async (req, res)=>{
    try{
        const user = await User.findById(req.user.id)
        const plant = await Plant.findById(req.params.id)
        if(plant == null){
            throw "Plant not found"
        }
        if(user.plants.includes(plant.id)){
            throw "Plant already in garden"
        }
        user.plants.push(plant.id)
        await user.save()
        res.status(200).json({"message":"Plant saved"})
    }
    catch(err){
        console.log(err)
        res.status(400).json({"message" : err})
    }
}