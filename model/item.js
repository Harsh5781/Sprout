const mongoose = require('mongoose')
const {Schema} = mongoose

const itemSchema = new Schema({
    productId : {
        type : String,
        required : true
    },
    productName : {
        type : String, 
        required : true
    },
    productPrice : {
        type : Number,
        required : true
    },
    quantity : {
        type : Number,
        required : true,
        default : 0,
        min : 0 
    },
    // totalPrice : {
    //     type : Number,
    //     default : ()=>{
    //         return this.productPrice * this.quantity
    //     }
    // },
    productImage:{
        type:String,
        required:true
    }
})

const Item = mongoose.model("Item", itemSchema);
module.exports = Item