const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay')
const Shop = require('../model/shop');

const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
});

router.route('/:id').
get(async (req, res)=>{
    const {id} = req.params;
    const product = await Shop.findById(id);
    const options = {
        amount:product.price,
        currency:"INR",
        receipt:"order123",
        notes:{name:product.name,
            desc:product.description}
    };
    instance.orders.create(options, (error, order)=>{
        if(error){
            res.status(500).json(error);
        }
        res.status(200).json(order);
    } )
})

module.exports = router;