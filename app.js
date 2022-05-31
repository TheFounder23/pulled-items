//getting an error while trying to shift the image posting form to some other link from index.ejs
//REMEMBER TO LINK THE DEVELPER PAGE AT THE FOOTER 
const express= require('express');
const { connect } = require('mongoose');
const fs = require('fs')
const cloudinary = require('cloudinary');
// const passport = require('passport');
const multer = require('multer');
// const {initializingPassport,isAuthenticated} = require("./passportConfig.js");
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
// const upload = require('./handler/multer')
const bodyParser = require('body-parser');
require("dotenv").config();
require('./handler/cloudinary')
const expressSession = require("express-session");
const { render } = require('express/lib/response');
const path = require('path');
// var test = require('./public/test');

// res.render('about', {
//     utils: test
// });
connectMongoose();


// initializingPassport(passport);


// app.use(expressSession({secret : "secret",resave :false,
// saveUninitialized:false}));
// app.use(passport.initialize());
// app.use(passport.session());
// app.get('*', function(req,res,next){
//     res.locals.user = req.user || null;
//     next();
// });

app.use(bodyParser.json()).use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended :true}));
app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/js',express.static(__dirname + 'public/js'))
app.use('/img',express.static(__dirname + 'public/img'))


app.set('views','./views')
app.set('view engine' , 'ejs')



app.get('',(req,res) =>{ //doubt how is the index the root file and for the bout we have to do /about
    res.render('helper')
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

// app.get('/user',isAuthenticated,(req,res) =>{
//     res.render('user')
    
// })

app.get('/collection',(req,res) =>{
  res.render('collection')
  
})



  // app.get('/store', isAuthenticated,function(req, res) {
  //   fs.readFile('items.json', function(error, data) {
  //     if (error) {
  //       res.status(500).end()
  //     } else {
  //       res.render('store.ejs', {
          
  //         items: JSON.parse(data)
  //       })
  //     }
  //   })
  // })

  

// app.get("/profile",isAuthenticated, (req,res) =>{
//     res.send(req.user);
// })

// app.get("/logout" ,isAuthenticated,(req,res) => {
//     req.logout();
//     res.redirect("/")
// })

// app.post("/login",passport.authenticate("local",{failureRedirect: "/register",
//  successRedirect : "/user"}),
// );

// app.post("/register",async (req,res) =>{
//     const user = await User.findOne({username: req.body.username});

//     if(user) return res.status(400).send("user already exists");

//     const newUser = await User.create(req.body);
//     res.redirect("/login");
//     //  res.status(201).send(newUser);
// });

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
// app.post('/upload',upload.single('file'),  async (req, res) => {
//   var imageFile =   req.file.filename;
//   var success = req.file.fieldname + "uploaded successfully";
//   var imageDetails = new uploadModel({
//     imagename: imageFile
//   })

//   imageDetails.save(function(err,doc) {
//     if(err) throw err;
//     imageData.exec(function(err,data)
//     {
//       if(err) throw err;
//       res.render('sample', { title: 'Upload File',records:data,  success: success});
//     });
//     // res.render('sample', { title: 'Upload File', success :'' });
//   })
//   const result = await cloudinary.v2.uploader.upload(req.file.path)
//   // res.send(result)
// })
// app.get('/upload',function(req,res,next){
//   imageData.exec(function(err,data){
//     if(err) throw err;
//     res.render('sample', { title: 'Upload File',records:data,  success:''});
//   })
// })


app.post('/purchase',function(req,res){
  var username = req.body.username;
  var htmlData = 'Hello:' + username;
 
  console.log(htmlData);
});


app.listen(port,() => console.info(`listening on port ${port}`))