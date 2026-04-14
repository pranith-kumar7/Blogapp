const jwt=require('jsonwebtoken');
require('dotenv').config()

 const verifyToken=(req,res,next)=>{
    let bearerToken=req.headers.authorization;
    if(!bearerToken || !bearerToken.startsWith('Bearer ')){
        return res.status(401).send({message:"Unauthorized access. Please log in."})
    }
    let token=bearerToken.split(' ')[1];
    try{
    let decodedToken=jwt.verify(token,process.env.SECRET_KEY)
    req.user=decodedToken
    next()
    }catch(err){
        return res.status(401).send({message:"Invalid or expired token"})
    }
}

module.exports=verifyToken
