const jwt = require('jsonwebtoken')
module.exports.getToken = function (uid){
    const token = jwt.sign({id: uid}, process.env.CODE)
    return token
}

module.exports.verifyToken = function(token){
    const verify = jwt.verify(token, process.env.CODE)
    return verify
}