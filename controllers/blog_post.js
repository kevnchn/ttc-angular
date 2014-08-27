var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
 
var blogPostSchema = new Schema({
	blog: {
        type: Schema.Types.ObjectId, 
        ref: 'Blog'
    },
    post: {
        type: Schema.Types.ObjectId, 
        ref: 'Post'
    }
});
 
module.exports = mongoose.model('BlogPost', blogPostSchema);