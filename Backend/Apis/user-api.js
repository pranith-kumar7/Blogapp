//create mini-express app
const exp=require('express')
const userapp=exp.Router()
const {createuserorauthor,loginuserorauthor}=require('./util')
const expressasynchandler=require('express-async-handler')
const verifyToken=require('../middleware/verifyToken')

let userCollections;
let articleCollections;
userapp.use((req,res,next)=>{
    userCollections=req.app.get('userCollections')
    articleCollections=req.app.get('articleCollections')
    next()
})


//define routes
//user creation
userapp.post('/user',expressasynchandler(createuserorauthor))

//user login
userapp.post('/login',expressasynchandler(loginuserorauthor))

//view article
userapp.get('/articles',verifyToken,expressasynchandler(async(req,res)=>{
    //get all articles of all authors
    const articleList=await articleCollections.find({status:true}).toArray( )
    res.send({message:"All Articles",payload:articleList})
}))

//add comment
userapp.post('/comment/:articleId',verifyToken,expressasynchandler(async(req,res)=>{
    //get article from url
    const articleIdUrl=(+req.params.articleId)
    //get comment obj from req
    const comment=req.body
    if(!comment?.comments?.trim()){
        return res.status(400).send({message:"Comment cannot be empty"})
    }
    //add comment obj as an element to comments array of articles
    const result=await articleCollections.updateOne({articleId:articleIdUrl},{$addToSet:{comments:comment}})
    if(result.matchedCount===0){
        return res.status(404).send({message:"Article not found"})
    }
    res.send({message:"Comment added"})
}))



//export authorapp  
module.exports=userapp
