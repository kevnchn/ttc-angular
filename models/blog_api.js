var Blog = require('../controllers/blog.js');
exports.findAll = function(req, res){
	// res.send([{name:'wine1'}, {name:'wine2'}, {name:'wine3'}]);
	Blog.find(function (err, blogs){
		if (err) { res.send(err) }
		if (blogs){
			res.send(blogs);
		}
	});
};

exports.findbyId = function(req, res){
	Blog.findOne(
		{_id: req.params.id},
		function(err, blog){
			if (err) { res.send(err) }
			if (blog){
				res.send(blog);
			}
		});
};

exports.add = function(req, res){
	var bloginstance = new Blog({
		username: req.body.username
	});
	bloginstance.save(function(err, blog){
		if (err){
			res.send(err);
		}else{
			res.send(blog);
		}
	})
}

exports.delete = function(req, res){
	Blog.remove({_id: req.params.id}, function (err) {
	  if (err){
	  	res.send(err);
	  }else{
	  	console.log('deleted');
	  }
	});
}

