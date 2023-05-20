const mongoose = require('mongoose')
const {Schema} = mongoose

const cartSchema = new Schema({
    items : [{
        type : Schema.Types.ObjectId,
        ref : 'Item'
    }],
    price : {
        type : Number,
        required : true,
        default : 0,
        min : 0
    }

})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart