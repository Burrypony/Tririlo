const jwt = require("jsonwebtoken")

const validateToken = (req,res,next) =>{
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;
    console.log(authHeader);
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.SECRET_TOKEN, (err,decoded) =>{
            if(err){
                res.status(401)
                res.json({error:'User is not authorized'})
            }
            req.user = decoded.user
            next()
        })
        if(!token){
            res.status(401)
            res.json({error:'User is not authorized'})
        }
    }
    if(!token){
        res.status(401)
        res.json({error:'User is not authorized'})
    }
}

module.exports = validateToken