var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
 
var postSchema = new Schema({
    text: {
    	type: String,
    	trim: true
    },
    blog_id: String
});

module.exports = mongoose.model('Post', postSchema);