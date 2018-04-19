var mongoose = require("mongoose");
var websiteSchema = require('../website/website.schema.server')

var UserSchema = mongoose.Schema({
  facebook: {
    id:    String,
    token: String
  },
  username: String,
  password: String,
  firstName:String,
  lastName: String,
  email: String,
  followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
  followings: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
  websites:[websiteSchema],
  dateCreated: {type: Date, default : Date.now}
}, {collection:'user'});

module.exports = UserSchema;
