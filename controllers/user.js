const auth = require('../utils/auth')

exports.registerUser = async (req, res)=>{
    const user = req.user
    console.log(user)
    res.status(200).json({
        "message":"Register successful",
        "token":req.token
    })
}

exports.loginUser = (req, res)=>{
    const user = req.user
    res.status(200).json({
        "message":"Login successful",
        "token":req.token
    })
}

exports.logoutUser = async (req, res)=>{
    try{
    res.clearCookie('jwt')
    }
    catch(er)
    {
        res.json("Cookie not deleted")
    }
    req.user.tokens = req.user.tokens.filter((elem)=>{
        return elem.token !== req.token
    })
    req.user.save()
    res.status(200).json({"message":"Logout successful"})
}