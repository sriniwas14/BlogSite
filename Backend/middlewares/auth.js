const { verifyKey } = require("../utils/token")

let pathExceptions = ['login', 'register']

exports.authChecker = (req, res, next) => {
    for (path of pathExceptions){
        if (req.path.search(path)!==-1){
            next()
            return
        }
    }
    const token = req.cookies.token
    if(!token){ 
        res.status(401).json({
            err: "invalid token"
        })
        return
    }  
    const decodedToken = verifyKey(token) 
    if(decodedToken){
        req.token = decodedToken
        next()
    } else {
        res.status(401).json({
            err: "expired token"
        })
    }    
}