var BlogPost = require('../controllers/blog_post.js'),
var Blog = require('../controllers/blog.js');
var Post = require('../controllers/post.js')


//list out all the linkages
exports.findAll = function(req, res) {
	BlogPost.find(function(err, links) {
  		res.send(links);
  	});
}

//find linkage by ID
exports.findById = function(req, res) {
	BlogPost.findOne({_id: req.params.id}, function(err, link) {
		if (err) {res.send(err)}
        if (link) {
            res.send(link);
        }
	});

};

exports.find = function(req, res){
	BlogPost.findOne({blog: req.params.id, post:req.params.post}, function(err, link){
		if (err) res.send(err);
		else if (link){
			res.send(link);
		}
		else { 
			res.send("");
		}
	})
}