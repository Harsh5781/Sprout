const {instance} = require('../utils/razorpayInstance')
const Shop = require('../model/shop');

exports.getOrder = async (req, res)=>{
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
}