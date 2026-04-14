const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv').config()

const validateAuthPayload=(user)=>{
    if(!user?.userType || !['user','author'].includes(user.userType)){
        return "Select a valid user type"
    }
    if(!user?.username?.trim()){
        return "Username is required"
    }
    if(!user?.password){
        return "Password is required"
    }
    return null
}

//req handler for user/author registration
const createuserorauthor=async(req,res)=>{
        //get user and author collection object
        const userCollectionsobj=req.app.get('userCollections')
        const authorCollectionsobj=req.app.get('authorCollections')

        //get user or author
        const user=req.body
        const validationError=validateAuthPayload(user)
        if(validationError){
            return res.status(400).send({message:validationError})
        }

        user.username=user.username.trim()
        if(user.email){
            user.email=user.email.trim().toLowerCase()
        }

        //check duplicate user
        if(user.userType==="user")
        {
            //find user by username
            let dbuser=await userCollectionsobj.findOne({username:user.username})
            //if user existed
            if(dbuser!==null){
                return res.status(409).send({message:"user already exists"})
            }
        }

        //check duplicate author
        if(user.userType==="author")
        {
            //find user by username
            let dbuser=await authorCollectionsobj.findOne({username:user.username})
            //if user existed
            if(dbuser!==null){
                return res.status(409).send({message:"author already exists"})
    
            }
        }
        //hash password
        const hashedPassword=await bcryptjs.hash(user.password,7)
        //replace plain pw with hashed pw
        user.password=hashedPassword

         //save user
         if(user.userType==='user'){
            await userCollectionsobj.insertOne(user)
            return res.status(201).send({message:"user created"})
        }

        //save author
        if(user.userType==='author'){
            await authorCollectionsobj.insertOne(user)
            return res.status(201).send({message:"author created"})
        }

        return res.status(400).send({message:"Invalid user type"})
};
const loginuserorauthor=async(req,res)=>{
        //get user and author collection object
        const userCollectionsobj=req.app.get('userCollections')
        const authorCollectionsobj=req.app.get('authorCollections')
        //get user or author
        const creduser=req.body
        const validationError=validateAuthPayload(creduser)
        if(validationError){
            return res.status(400).send({message:validationError})
        }
        creduser.username=creduser.username.trim()

        //verify username of user
        if(creduser.userType==='user'){
            let dbuser=await userCollectionsobj.findOne({username:creduser.username})
            if(dbuser===null){
                return res.status(401).send({message:"invalid username"})
            }
            else{
                let status=await bcryptjs.compare(creduser.password,dbuser.password)
                if(status===false){
                    return res.status(401).send({message:"Invalid password"})
                }
                else{
                    const signedToken=jwt.sign({username:dbuser.username},process.env.SECRET_KEY,{expiresIn:"1h"})
                    delete dbuser.password;
                    return res.send({message:"login success",token:signedToken,user:dbuser})
                }
            }
        }

         //verify username of author
         if(creduser.userType==='author'){
            let dbuser=await authorCollectionsobj.findOne({username:creduser.username})
            if(dbuser===null){
                return res.status(401).send({message:"invalid username"})
            }
            else{
                let status=await bcryptjs.compare(creduser.password,dbuser.password)
                if(status===false){
                    return res.status(401).send({message:"Invalid password"})
                }
                else{
                    const signedToken=jwt.sign({username:dbuser.username},process.env.SECRET_KEY,{expiresIn:"1h"})
                    delete dbuser.password;
                    return res.send({message:"login success",token:signedToken,user:dbuser})
                }
            }
        }

        return res.status(400).send({message:"Invalid user type"})
};
module.exports={createuserorauthor,loginuserorauthor}

