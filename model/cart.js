const mongoose = require('mongoose')
const {Schema} = mongoose

const cartSchema = new Schema({
    items : [{
        type : Schema.Types.ObjectId,
        ref : 'Item'
    }],
    // quantity : {
    //     type : Number,
    //     default : ()=>{
    //         let total
    //         this.items.forEach(item => {
    //             total += item.quantity
    //         })
    //         return total
    //     }
    // },
    // price : {
    //     type : Number,
    //     required : true,
    //     default : ()=>{
    //         let total
    //         this.items.forEach(item => {
    //             total += item.totalPrice
    //         })
    //         return total
    //     }
    // }

})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart