const mongoose = require('mongoose');

exports.connectMongoose = () =>{
    mongoose
    .connect('mongodb://localhost:27017/passport')
    .then((e) =>console.log(`connected to ${e.connection.host}`))
    .catch(e => console.log(e));

};

var uploadSchema = new mongoose.Schema({
    imagename : String,
});

var uploadModel = mongoose.model('uploadimage', uploadSchema);
module.exports = uploadModel;