//calling express
const express=require('express');
const app=express();
// var cors = require('cors')
//calling what we gonna use
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');

//db connection
const config=require('./config/config')

const getConfigParameter = config.get(process.env.NODE_ENV)
// console.log(getConfig)
const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect(getConfigParameter.DATABASE,{useNewUrlParser:true})
        .then(()=>{console.log("DB connected")})
        .catch((err)=>console.log(err))
mongoose.set('useCreateIndex', true);
//calling models

// app.use(cors())
const {User}=require('./models/user');
const {Story}=require('./models/stories');
const {auth}=require('./middleware/auth')
//add these two carefully else u get nothing passed
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('client/build'))
//Stories methods
app.get('/api/getStory',(req,res)=>{
    const id=req.query.id;
    Story.findById(id,(err,doc)=>{
        if(err) return res.status(400).send(err.message);
        else return res.status(200).send(doc);
    })
})
app.get('/api/getStoryByUser', (req, res) => {
    const id = req.query.id;
    Story.find({"ownderId":id}, (err, doc) => {
        if (err) return res.status(400).send(err.message);
        else return res.status(200).send(doc);
    })
})
app.get('/api/getStories',(req,res)=>{
    // console.log("path triggerd")
    //query will be like this
    //localhost/api/getstories?skip=3&limit=2&order=asc
    var skip=parseInt(req.query.skip) ;
    var limit = parseInt(req.query.limit);
    var order=req.query.order;
    //query be like
    Story.find().skip(skip).sort({_id:order}).limit(limit).exec((err,doc)=>{
       if(err) {return res.status(400).send(err.message)}
       else return res.status(200).send(doc)
    })
})

//post
app.post('/api/postStories',(req,res)=>{
    //  console.log("path triggerd /api/postStories")
    // console.log(req.body)
    const story=new Story(req.body)
    story.save((err,doc)=>{
        if(err) return res.status(400).send(err.message)
        else return res.status(200).json(doc)
    })
})
//update
app.post('/api/Story_update',(req,res)=>{
    //  console.log("path triggerd /api/Story_updat")
    var id=req.body._id;
    var body=req.body;
    Story.findByIdAndUpdate(id,body,{new:true},(err,doc)=>{
         if (err) return res.status(400).send(err.message);
         else res.status(200).send(doc);
    })
})
//delete book
app.delete('/api/Story_delete',(req,res)=>{
    //  console.log("/api/Story_delete")
    var id=req.query.id;
    Story.findByIdAndRemove(id,(err,doc)=>{
         if (err) return res.status(400).send(err.message);
         else res.status(200).json({
             success:true
         });
    })
})

//user methods
//get
app.get('/api/getUsers',(req,res)=>{
  
    User.find().exec((err,doc)=>{
       if(err) {return res.status(400).send(err.message)}
       else return res.status(200).send(doc)
    })
})

app.get('/api/getOwnerOfStory',(req,res)=>{
    let id=req.query.id;
    User.findById(id,(err,doc)=>{
        if(err) {return res.status(400).send(err.message)}
        else return res.status(200).json({
            firstname: doc.firstname,
            lastname: doc.lastname
        })
    })
})

//post
app.post('/api/registerUser', (req, res) => {
    // console.log(req.body)
    const user = new User(req.body)
    user.save((err, doc) => {
        if (err) return res.status(400).send(err.message)
        else return res.status(200).json(doc)
    })
})
//login
app.post('/api/login',(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user){
            return res.json(
                {isAuth:false,
                message:'auth failed,User does not exist'}
                )}
        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(err) return res.send(err.message);
            if(!isMatch){
                    return res.json({
                        isAuth:false,
                        message: 'Wrong Password'
                    });
                }
            else{
                user.generateToken((err,user)=>{
                    if(err) return res.status(400).send(err.message)
                    
                    
                    res.cookie('Authentication',user.token).json({
                        isAuth:true,
                        id:user._id,
                        email:user.email
                    })
                })
            }

        })
    })
})
//logout
app.get('/api/logout',auth,(req,res)=>{
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err)
        else res.sendStatus(200)
    })
    
})

//get user details if user is authenticated in every authorized route
app.get('/api/auth', auth, (req, res) => {
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        name: req.user.email,
        lastname: req.user.lastname
    })
})


if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('/*', (req, res) => {
        res.sendfile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    })
}
const PORT = 5000 || process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server runs on ${PORT}`)
})
