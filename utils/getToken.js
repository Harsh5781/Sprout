const jwt = require('jsonwebtoken')
module.exports.getToken = function (uid){
    const token = jwt.sign({id: uid}, 'secretcodecodesecret')
    return token
}

module.exports.verifyToken = function(token){
    const verify = jwt.verify(token, 'secretcodecodesecret')
    return verify
}