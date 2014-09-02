var Post = require('../controllers/post.js');

exports.findAll = function(req, res){
	Post.find(function(err, posts){
		res.send(posts);
	});
};

exports.findbyId = function(req, res){
	Post.findOne({_id: req.params.id},function(err, post){
		if (err) { 
			res.send(err) 
		}
		if (post){
			res.send(post);
		}
	});
};

exports.findbyBlog = function(req, res){
	Post.find({blog_id: req.params.id},function(err, posts){
		if (err) { 
			res.send(err) 
		}
		if (posts){
			res.send(posts);
		}
	});
};
