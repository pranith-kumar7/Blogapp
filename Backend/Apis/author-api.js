//create mini-express app
const exp=require('express')
const authorapp=exp.Router()
const expressasynchandler=require('express-async-handler')
const {createuserorauthor,loginuserorauthor}=require('./util')
const verifyToken=require('../middleware/verifyToken')

let authorCollections;
let articleCollections;
authorapp.use((req,res,next)=>{
    authorCollections=req.app.get('authorCollections')
    articleCollections=req.app.get('articleCollections')
    next()
})

//define routes
authorapp.post('/user',expressasynchandler(createuserorauthor)) 
//author login 
authorapp.post('/login',expressasynchandler(loginuserorauthor))
//to save new article   
authorapp.post('/new-article',verifyToken,expressasynchandler(async(req,res)=>{
    //get new article from client
    const newarticle=req.body
    //save new article to article collections
    await articleCollections.insertOne(newarticle)
    //send res
    res.send({Message:"New article added"})
}))

//read articles by author's username 
authorapp.get('/articles/:username',verifyToken,expressasynchandler(async(req,res)=>{
    //get author's username from url
    const usernameOfauthor=req.params.username
    //get articles of current author
    const articlesList=await articleCollections.find({username:usernameOfauthor}).toArray()
    res.send({message:"Articles",payload:articlesList})
}))

//edit article
authorapp.put('/article',verifyToken,expressasynchandler(async(req,res)=>{
    //get modified article
    const  modifiedarticle=req.body
    let articleAfterModification=await articleCollections.findOneAndUpdate({articleId:(+modifiedarticle.articleId)},{$set:{...modifiedarticle}},{returnDocument:'after'})
    res.send({message:"article modified",payload:articleAfterModification})
}))

//delete article(soft delete)
authorapp.put('/article/:articleId',verifyToken,expressasynchandler(async(req,res)=>{
    console.log("hello")
    let articleIdofUrl=Number(req.params.articleId)
    let art=req.body
    if(art.status===true){
    let result=await articleCollections.updateOne({articleId:articleIdofUrl},{$set:{status:false}})
    console.log(result)
    if(result.modifiedCount===1){
    return res.send({message:"article deleted"})
    }
  }
  if(art.status===false){
    let result=await articleCollections.updateOne({articleId:articleIdofUrl},{$set:{status:true}})
    console.log(result)
    if(result.modifiedCount===1){
      return res.send({message:"article restored"})
    }
  }
}))

//export authorapp
module.exports=authorapp