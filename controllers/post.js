var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
 
var postSchema = new Schema({
    text: {
    	type: String,
    	trim: true
    },
    blog_id: String,
    img: String,
    date: { type : Date, default : Date.now }
});

module.exports = mongoose.model('Post', postSchema);