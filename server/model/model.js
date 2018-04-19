var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://nestling:3536036@ds149309.mlab.com:49309/heroku_8rmgv9mv');
//var db = mongoose.connect('mongodb://localhost:27017/webdev');
module.exports = db;
