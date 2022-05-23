const mongoose = require('mongoose')
const {Schema}= mongoose

const gardenSchema= new Schema({
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

module.exports = new mongoose.model('Garden', gardenSchema)