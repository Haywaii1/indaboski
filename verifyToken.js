const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token){
        return res.status(404).json({error: "Access denied"})
    }
    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()
    }catch (error) {
        res.status(500).json({error: "Invalid Token"})
    }
}

module.exports = {verifyToken}