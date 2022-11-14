const mongoose = require("mongoose");
const {Schema} = mongoose;
const samples = require('../sampleShop')

// mongoose.connect(process.env.DB_URL)
// .then(()=>{
//     console.log('Connected to database')
// })
// .catch(err=>{
//     console.log(err)
// })

const shopSchema =  new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
        enum:["Indoor", "Outdoor", "Garden", "Medicine"]
    },
    image:{
        type:String,
        required:true
    }

})

const Shop = mongoose.model('Shop', shopSchema);

// Shop.deleteMany({}).then(d=>{console.log(d)}).catch(e=>{console.log(e)})
// Shop.insertMany(samples).then(d=>{console.log(d)}).catch(e=>{console.log(e)})

module.exports = Shop