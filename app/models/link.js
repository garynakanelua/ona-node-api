var mongoose = require('mongoose'); //helps talk with mongodb
var Schema = mongoose.Schema; //funny because mongodb doesn't technically use a schema

var LinkSchema = new Schema({
  url: String,
  description: String
});

module.exports = mongoose.model('Link', LinkSchema);