//newclustergonjdbx-> test->upload images (route to the database which contains image after uploading)
// "start": "nodemon app.js",
    // "start:dev": "nodemon app.js"
const express= require('express');
const { connect } = require('mongoose');
const fs = require('fs')
const fetch = require("node-fetch");
const cloudinary = require('cloudinary');
const multer = require('multer');
const app = express();
const port = 3000;
var uploadModel = require("./upload.js");
var imageData = uploadModel.find({});
var Storage = multer.diskStorage({
  destination:"./public/uploads/",
  filename:(req,file,cb) =>{
    cb(null,file.fieldname+"_" + Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({
  storage:Storage
}).single('file');
const {connectMongoose,User} = require("./database.js");
const bodyParser = require('body-parser');
require("dotenv").config();
require('./handler/cloudinary')
const expressSession = require("express-session");
// const { render } = require('express/lib/response');
const path = require('path');
const { response } = require('express');
connectMongoose();
app.use(bodyParser.json()).use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended :true}));
app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/js',express.static(__dirname + 'public/js'))
app.use('/img',express.static(__dirname + 'public/img'))
app.set('views','./views')
app.set('view engine' , 'ejs')



app.get('',(req,res) =>{ 
    res.render('helper')
})
app.get('/rate',(req,res) =>{
  res.render('rate')
})
app.get('/index',(req,res) =>{
  res.render('index')
})
app.get('/about',(req,res) =>{
    res.render('about')
})
app.get('/contact',(req,res) =>{
    res.render('contact')
})
app.get('/developer',(req,res) =>{
    res.render('developer')
    
})
app.get('/helper',(req,res) =>{
  res.render('helper')
  
}) 
app.get('/ring',(req,res) =>{
  res.render('ring')
  
}) 
app.get('/bangles',(req,res) =>{
  res.render('bangles')
  
}) 
app.get('/chains',(req,res) =>{
  res.render('chains')
  
}) 
app.get('/earring',(req,res) =>{
  res.render('earring')
  
}) 
app.get('/necklace',(req,res) =>{
  res.render('necklace')
  
})
app.get('/login',(req,res) =>{ 
    res.render('login')
})
app.get('/register',(req,res) =>{
    res.render('register')
    
})
app.get('/collection',(req,res) =>{
  res.render('collection')
  
})



app.post('/upload', upload,function(req,res,next){
  var imageFile = req.file.filename;
  var success = req.file.fieldname + "uploaded successfully";
  var imageDetails = new uploadModel({
    imagename:imageFile
  });
  
  imageDetails.save(function(err,doc){
    if(err) throw err;
  
    imageData.exec(function(err,data){
      if(err) throw err;
      res.render('sample',{title:'Upload File',records: data,success: success});
    })

    
  })  
})

app.get('/upload',function(req,res,next){
  imageData.exec(function(err,data){
    if(err) throw err;
  res.render('sample',{title:'Upload File' ,records: data,success : ''});
  })
})


app.listen(process.env.PORT || 3000)

