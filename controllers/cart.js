const Cart = require('../model/cart')
const User = require('../model/userSchema')
const Shop = require('../model/shop')
const Item = require('../model/item')

const INVALID_CART_ID = "Invalid cart id"
const ITEM_NOT_FOUND = "Item not found in cart"
const PRODUCT_NOT_FOUND = "Product not found"

exports.getCart = async (req, res)=>{
    try{
        const user = await User.findById(req.user.id).populate('cart')
        if(user.cart == null || user.cart.items.length == 0){
            throw "Cart is empty"
        }
        const cart = await Cart.findById(user.cart._id).populate('items')
        res.json(cart)
    }
    catch(error){
        console.log(error)
        res.status(404).json({"message" : error})
    }
}

exports.deleteCart = async (req, res)=>{
    try {
        const cart = await Cart.findById({"_id":req.params.id})
        if(cart == null){
            throw INVALID_CART_ID
        }
        cart.items.forEach(async item => {
            await Item.deleteOne({"_id" : item._id})
        })
        console.log(cart.items)
        await cart.delete()
        let user = await User.findById(req.user.id).populate('cart')
        user.cart = null
        await user.save()
        res.status(200).json({"message" : "Cart cleared successfully"})
        
    } catch (error) {
        console.log(error)
        res.status(404).json({"message" : error})
    }
}

exports.addToCart = async (req, res)=>{
    try {
        let isItemPresentInCart = false
        let item
        const product = await Shop.findById(req.params.id)
        if(product == null) {
            throw PRODUCT_NOT_FOUND
        }

        const user = await User.findById(req.user.id).populate('cart')
        let cart
        if(user.cart != null) {
            cart = await Cart.findById(user.cart._id).populate('items')
            cart.items.forEach(currentItem => {
                if(currentItem.productId == product._id){
                    item = currentItem
                    isItemPresentInCart = true
                }
            });
        }

        if(item == null){
            console.log(item)
            item = new Item({productId : product._id, productName : product.name, productPrice : product.price, productImage : product.image})
        }
        item.quantity = item.quantity + 1
        
        await item.save()
        if(cart == null){
            cart = new Cart()
            user.cart = cart
            await user.save()
        }
        if(!isItemPresentInCart){
            cart.items.push(item)
        }
        await cart.save()
    
        res.status(201).json({"message":"Item added to cart successfully"})
    }
    catch(error){
        console.log(error)
        res.status(400).json({"message" : error})
    }
}

exports.deleteItem = async (req, res)=>{
    try {
        const cart = await Cart.findById(req.params.cartId).populate('items')
        if(cart == null) {
            throw INVALID_CART_ID
        }

        const item = await Item.findById(req.params.itemId)
        if(item == null){
            throw ITEM_NOT_FOUND
        }

        cart.items.splice(cart.items.indexOf(item), 1)
        await item.delete()
        await cart.save()

        res.status(200).json({"message" : "Item removed from cart successfully"})
    } catch (error) {
        console.log(error)
        res.status(400).json({"message" : error})
    }
}

exports.increseQuantityInCart = async (req, res)=>{
    try{
        let item = await Item.findById(req.params.itemId)
        if(item == null){
            throw ITEM_NOT_FOUND
        }

        item.quantity++
        await item.save()
        res.status(200).json({"message" : "Item added to cart successfully"})
    }
    catch(error){
        console.log(error)
        res.status(400).json({"message" : error})
    }
}

exports.decreaseQuantityInCart = async (req, res)=>{
    try {
        let item = await Item.findById(req.params.itemId)
        if(item == null){
            throw ITEM_NOT_FOUND
        }
        
        item.quantity--
        if(item.quantity == 0){
            const cart = await Cart.findById(req.params.id).populate('items')
            if(cart == null){
                throw INVALID_CART_ID
            }
            cart.items.splice(cart.items.indexOf(item), 1)
            await item.delete()
            await cart.save()
        }
        else{
            await item.save()
        }
        
        res.status(200).json({"message" : "Item removed from cart successfully"})
    } catch (error) {
        console.log(error)
        res.status(400).json({"message" : error})
    }
}