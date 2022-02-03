const express= require('express')
const mongoose = require('mongoose');
const app = express();
const port = 3000
const DB = 'mongodb+srv://Siddharth:siddharth@NO1@app.nk9a5.mongodb.net/appdev?retryWrites=true&w=majority'
require("dotenv").config()
const uri = process.env.MONGODB_CONNECTION_STRING;
mongoose.connect(uri,{
    useNewUrlParser: true,
    // useCreateIndex : true,
    useUnifiedTopology:true,
});

const connection = mongoose.connection;
connection.once("open" ,() => {
    console.log("connection success")
})

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

app.get('/gold',(req,res) =>{
    res.render('gold')
    
})

app.get('/stones',(req,res) =>{
    res.render('stones')
    
})


app.listen(port,() => console.info(`listening on port ${port}`))