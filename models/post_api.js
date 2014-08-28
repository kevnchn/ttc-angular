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

exports.add = function(req, res){
	console.log('req', req.body);
	res.send('hi');
	var writestream = gfs.createWriteStream();
		fs.createReadStream(req.body.img)
		.on('end', function() {
			res.send('OK');
		})
		.on('error', function() {
			res.send('ERR');
		})
		// and pipe it to gfs
		.pipe(writestream);


	// var postinstance = new Post({
	// 	text: req.body.text,
	// 	blog_id: req.body.blog_id
	// });
	// 	console.log(writestream);
	// 	postinstance.img_id = writestream._id;
	// 	postinstance.save(function(err, post){
	// 	if (err){
	// 		res.send(err);
	// 	}else{
	// 		res.send(post);
	// 	}
	// });
}

exports.delete = function(req, res){
	Post.remove({_id: req.params.id}, function (err) {
	  if (err){
	  	res.send(err);
	  }else{
	  	console.log('deleted!');
	  }
	});

}
