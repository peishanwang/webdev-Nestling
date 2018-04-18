var mongoose = require("mongoose");
var widgetSchema = require('../widget/widget.schema.server')

var PageSchema = mongoose.Schema ({
  _website : {type : mongoose.Schema.ObjectId, ref: "Website"},
  name : {type : String, required : true},
  title : String,
  description: String,
  widgets:[widgetSchema],
  dateCreated : {type: Date, default : Date.now} //Date.now is the current time
}, {collection:'page'});

module.exports = PageSchema;
