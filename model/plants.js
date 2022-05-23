const mongoose = require('mongoose')
const {Schema } = mongoose
const samples = require('../samplaPlant')

// mongoose.connect('mongodb://localhost:27017/sprout')
// .then(()=>{
//     console.log('Connected to database')
// })
// .catch(err=>{
//     console.log(err)
// })

const plantSchema = new Schema({
    pid: {
        type: String
    },
    name: {
        type: String
    },
    display_pid: {
        type: String
    },
    alias: {
        type: String
    },
    max_light_mmol: {
        type: Number
    },
    min_light_mmol: {
        type: Number
    },
    max_light_lux: {
        type: Number
    },
    min_light_lux: {
        type: Number
    },
    max_temp: {
        type: Number
    },
    min_temp: {
        type: Number
    },
    max_env_humid: {
        type: Number
    },
    min_env_humid: {
        type: Number
    },
    max_soil_moist: {
        type: Number
    },
    min_soil_moist: {
        type: Number
    },
    max_soil_ec: {
        type: Number
    },
    min_soil_ec: {
        type: Number
    },
    image_url:{
        type: String
    }
})

const Plant = mongoose.model('Plant', plantSchema)

// Plant.insertMany(samples).then(d=>{console.log(d)}).catch(e=>{console.log(e)})

module.exports = Plant