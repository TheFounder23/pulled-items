const express= require('express');
const { connect } = require('mongoose');
// const mongoose = require('mongoose');
const passport = require('passport');
const {initializingPassport,isAuthenticated} = require("./passportConfig.js");

const app = express();
const port = 3000
const {connectMongoose,User} = require("./database.js");
const expressSession = require("express-session");
connectMongoose();


initializingPassport(passport);

app.use(expressSession({secret : "secret",resave :false,
saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());
app.use(express.urlencoded({ extended :true}));
app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/js',express.static(__dirname + 'public/js'))
app.use('/img',express.static(__dirname + 'public/img'))


app.set('views','./views')
app.set('view engine' , 'ejs')


app.get('',(req,res) =>{ //doubt how is the index the root file and for the bout we have to do /about
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

app.get('/gold',isAuthenticated,(req,res) =>{
    res.render('gold')
    
})

app.get('/stones',isAuthenticated,(req,res) =>{
    res.render('stones')
    
})
 
 
app.get('/login',(req,res) =>{ //new
    res.render('login')
})

app.get('/register',(req,res) =>{
    res.render('register')
    
})

app.get('/user',(req,res) =>{
    res.render('user')
    
})





// app.get("/profile",isAuthenticated, (req,res) =>{
//     res.send(req.user);
// })

app.get("/logout" ,isAuthenticated,(req,res) => {
    req.logout();
    res.redirect("/")
})

app.post("/login",passport.authenticate("local",{failureRedirect: "/register",
 successRedirect : "/user"}),
);

app.post("/register",async (req,res) =>{
    const user = await User.findOne({username: req.body.username});

    if(user) return res.status(400).send("user already exists");

    const newUser = await User.create(req.body);
     res.status(201).send(newUser);
});

function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}


app.listen(port,() => console.info(`listening on port ${port}`))