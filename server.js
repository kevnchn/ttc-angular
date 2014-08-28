// server.js

// set up ========================
var express  = require('express');
var fs  = require('fs');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var morgan = require('morgan'); 			// log requests to the console (express4)
var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var Grid = require('gridfs-stream');
var multipart = require('multiparty');
var busboy = require('connect-busboy');
var path = require('path');             //used for file path
var fs = require('fs-extra');           //File System - for file manipulation
var request = require('request');
//API links
var blog_api = require('./models/blog_api.js'),
    post_api = require('./models/post_api.js');
	

// configuration =================

// listen (start app with node server.js) ======================================
var db = mongoose.createConnection('mongodb://localhost:27017/ttc-onboarding', 
	function(err){
		if (err){
			console.log(err);
		}else{
			console.log('successfully connected');
		}
	});

mongoose.connect('mongodb://localhost:27017/ttc-onboarding');

var gfs = Grid(db.db, mongoose.mongo);

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
	app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
	app.use(morgan('dev')); 										// log every request to the console
	app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
	app.use(bodyParser.json()); 									// parse application/json
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
	app.use(methodOverride());
	app.use(busboy());



}

var router = express.Router(); 				// get an instance of the express Router

app.use('/api', router);

app.get('/', function(req, res) {
	res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.get("/api/blogs", blog_api.findAll);
app.post('/api/blogs/add', blog_api.add);
app.get("/api/blogs/:id", blog_api.findbyId);
app.delete('/api/blogs/delete/:id', blog_api.delete);
app.get('/api/posts', post_api.findAll);
app.get('/api/posts/:id', post_api.findbyBlog);
app.post('/api/posts/add', function(req, res, next){
	// console.log(req.params);
	console.log(req.body);
var Post = require('./controllers/post.js');

  var postinstance = new Post({blog_id: req.body.blog_id});
  if(req.body.url) {
    var url = unescape(req.body.url);
    request({uri:url, encoding: 'binary'}, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var data_uri_prefix = "data:" + response.headers["content-type"] + ";base64,";
        image = new Buffer(body.toString(), "binary").toString("base64");

        postinstance.img = data_uri_prefix + image;
        console.log(postinstance);
        postinstance.save(function(err, post){
        	if (err){
			res.send(err);
			}else{
				res.send(post);
			}
        });
      }
    }); 
  }

});
app.delete('/api/posts/delete/:id', post_api.delete);
app.get('/downloads/', function(req, res) {
	// TODO: set proper mime type + filename, handle errors, etc...
	
	gfs.exist({_id: '53fe933a477dc87621000001'}, function (err, found) {
	  if (err) return handleError(err);
	  found ? console.log('File exists') : console.log('File does not exist');
	});
});

app.listen(2020);
console.log("App listening on port 2020");

