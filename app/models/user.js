var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
  name :{
    type: String,
    unique : false,
    required : true
},
  email: {
    type: String,
    unique : true,
    required : true
},
  login: {
    type: String,
    unique : true,
    required : true
},
  password: {
    type: String,
    unique : false,
    required : true
},
}))