var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
 
var BlogSchema = new Schema({
    username: String
});

module.exports = mongoose.model('Blog', BlogSchema);