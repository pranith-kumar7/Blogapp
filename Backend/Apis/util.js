const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv').config()
//req handler for user/author registration
const createuserorauthor=async(req,res)=>{
        //get user and author collection object
        const userCollectionsobj=req.app.get('userCollections')
        const authorCollectionsobj=req.app.get('authorCollections')

        //get user or author
        const user=req.body
        console.log("Received Data:",user);
        //check duplicate user
        if(user.userType==="user")
        {
            //find user by username
            let dbuser=await userCollectionsobj.findOne({username:user.username})
            //if user existed
            if(dbuser!==null){
                return res.send({message:"user already exists"})
            }
        }

        //check duplicate author
        if(user.userType==="author")
        {
            //find user by username
            let dbuser=await authorCollectionsobj.findOne({username:user.username})
            //if user existed
            if(dbuser!==null){
                return res.send({message:"author already exists"})
    
            }
        }
        if (!user.password) {
            return res.status(400).json({ message: "Password is required" });
        }        
        //hash password
        const hashedPassword=await bcryptjs.hash(user.password,7)
        //replace plain pw with hashed pw
        user.password=hashedPassword

         //save user
         if(user.userType==='user'){
            await userCollectionsobj.insertOne(user)
            res.send({message:"user created"})
        }

        //save author
        if(user.userType==='author'){
            await authorCollectionsobj.insertOne(user)
            res.send({message:"author created"})
        }

};
const loginuserorauthor=async(req,res)=>{
        //get user and author collection object
        const userCollectionsobj=req.app.get('userCollections')
        const authorCollectionsobj=req.app.get('authorCollections')
        //get user or author
        const creduser=req.body

        //verify username of user
        if(creduser.userType==='user'){
            let dbuser=await userCollectionsobj.findOne({username:creduser.username})
            if(dbuser===null){
                return res.send({message:"invalid username"})
            }
            else{
                let status=await bcryptjs.compare(creduser.password,dbuser.password)
                console.log('status',status)
                if(status===false){
                    return res.send({message:"Invalid password"})
                }
                else{
                    const signedToken=jwt.sign({username:dbuser.username},process.env.SECRET_KEY,{expiresIn:"1h"})
                    delete dbuser.password;
                    res.send({message:"login success",token:signedToken,user:dbuser})
                }
            }
        }

         //verify username of author
         if(creduser.userType==='author'){
            let dbuser=await authorCollectionsobj.findOne({username:creduser.username})
            if(dbuser===null){
                return res.send({message:"invalid username"})
            }
            else{
                let status=await bcryptjs.compare(creduser.password,dbuser.password)
                if(status===false){
                    return res.send({message:"Invalid password"})
                }
                else{
                    const signedToken=jwt.sign({username:dbuser.username},process.env.SECRET_KEY,{expiresIn:"1h"})
                    delete dbuser.password;
                    res.send({message:"login success",token:signedToken,user:dbuser})
                }
            }
        }
};
module.exports={createuserorauthor,loginuserorauthor}

