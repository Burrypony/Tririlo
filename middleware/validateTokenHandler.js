const jwt = require("jsonwebtoken")

const validateToken = (req,res,next) =>{
    let token;
    const authHeader = req.headers.Autorization || req.headers.autorization;

    if(authHeader && authHeader.startWith("Bearer")){
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
}

module.exports = validateToken