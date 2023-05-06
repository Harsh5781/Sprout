exports.registerUser = async (req, res)=>{
    res.status(200).json({
        "message":"Register successful",
        "user":{
            "username":req.user.username,
            "email":req.user.email,
            "isAdmin":req.user.isAdmin
        },
        "token":req.token
    })
}

exports.loginUser = (req, res)=>{
    res.status(200).json({
        "message":"Login successful",
        "user":{
            "username":req.user.username,
            "email":req.user.email,
            "isAdmin":req.user.isAdmin
        },
        "token": req.token
    })
}

exports.logoutUser = async (req, res)=>{
    req.user.tokens = req.user.tokens.filter((token)=>{
        return token !== req.token
    })
    req.user.save()
    res.removeHeader('Auth-token')
    res.status(200).json({"message":"Logout successful"})
}