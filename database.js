const mongoose = require('mongoose');

exports.connectMongoose = () =>{
    mongoose
    // .connect('mongodb://localhost:27017/passport')
    .connect('mongodb+srv://sid:siddharth@newcluster.gonjdpx.mongodb.net/test')
    .then((e) =>console.log(`connected to ${e.connection.host}`))
    .catch(e => console.log(e));

};

