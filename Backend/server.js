//create express app
const exp=require('express')
const app=exp()
const path=require('path')
const cors=require('cors')
require('dotenv').config()
//add body parser middleware
app.use(cors({
    origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',').map(url => url.trim()) : '*',
    credentials: true
}))
app.use(exp.json())
//place react build in http webserver
app.use(exp.static(path.join(__dirname,'../frontend/build')))
const mongoClient=require('mongodb').MongoClient
//connect to mongodb server
mongoClient.connect(process.env.DB_URL)
.then((client)=>{
    console.log("✅ Connected to MongoDB");
    //get database object
    const blogdobj=client.db('blogdb2')
    const userCollections=blogdobj.collection('users')
    const authorCollections=blogdobj.collection('authors')
    const articleCollections=blogdobj.collection('articles')
    //share collection objects with api
    app.set('userCollections',userCollections)
    app.set('authorCollections',authorCollections)
    app.set('articleCollections',articleCollections)
    console.log("DB connection success")
})
.catch((err)=>{
    console.log("error in db connect",err)
})

//import apis
const userapp=require('./Apis/user-api')
const authorapp=require('./Apis/author-api')
const adminapp=require('./Apis/admin-api')

//handover route to specific route based on starting of path
app.use('/user-api',userapp)
app.use('/author-api',authorapp)
app.use('/admin-api',adminapp)


app.get('/test', (req, res) => {
    res.send("✅ Server is working!");
})


//deals with page refresh
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../frontend/build/index.html'))
  })

//error handling middleware
app.use((err,req,res,next)=>{
    res.send({status:"error",message:err.message})   
})



//get port number from env
const port=process.env.PORT || 7000


//assign port number to http server
app.listen(port,()=>console.log(`server is running on ${port}`)) 
