const Shop = require('../model/shop');
const message500 = {"message":"Something went wrong"};
const message404 = {"message":"Product not found"};

exports.getAllProducts = async (req,res)=>{
    try {
        const product = await Shop.find();
        if(product.length==0){
            res.status(404).json(message404);
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json(message500);
    }
}

exports.getProductById = async (req, res) =>{
    try {
        const {id} = req.params;
        const product = await Shop.findById(id);
        if(product==null){
            res.status(404).json({"message":"Product not found"})
        }
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
        res.status(500).json({"message":"Something went wrong"});
    }
}

exports.getProductByCategory = async (req, res)=>{
    try {
        const {category} = req.params;
        const products = await Shop.find();
        const final = products.filter(product=>{
            if(product.category ==category){
                return product;
            }
        })
        if(final.length==0){
            res.status(404).json(message404);
        }
        res.status(200).json(final);
    } catch (error) {
        console.log(error);
        res.status(500).json({"message":"Something went wrong"});
    }
}

exports.searchProducts = async (req, res)=>{
    try {
        const products = await Shop.find({name:{$regex : req.query.name, $options:'i'}})
        if(products.length == 0){
            throw "No item found"
        }
        res.status(200).json(products)
    } catch (error) {
        console.log(error)
        res.status(400).json({"message" : error})
    }
}