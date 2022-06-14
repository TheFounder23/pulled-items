const mongoose = require('mongoose');

exports.connectMongoose = () =>{
    mongoose
    .connect('mongodb+srv://sid:siddharth@newcluster.gonjdpx.mongodb.net/test')
    .then((e) =>console.log(`connected to ${e.connection.host}`))
    .catch(e => console.log(e));

};

var uploadSchema = new mongoose.Schema({
    imagename : String,
});

var uploadModel = mongoose.model('uploadimage', uploadSchema);
module.exports = uploadModel;