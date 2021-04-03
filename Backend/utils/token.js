const { TokenExpiredError, sign, verify } = require("jsonwebtoken")

exports.signKey = (data, expiresIn) => {
    console.log("DATA ", data)
    var token = sign(data.toJSON(), process.env.JWT_KEY, { expiresIn: expiresIn ? expiresIn : process.env.JWT_EXPIRATION })
    return token
}

exports.verifyKey = (token) => {
    try {
        var decodedToken = verify(token, process.env.JWT_KEY)
        return decodedToken
    } catch(err){
        if (err instanceof TokenExpiredError){
            return null
        }
    }
    
}