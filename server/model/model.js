var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://webdev:3536036@ds263837.mlab.com:63837/heroku_8tqgs75h');
//var db = mongoose.connect('mongodb://localhost:27017/webdev');
module.exports = db;
