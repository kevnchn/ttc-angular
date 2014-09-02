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
var moment = require('moment');
var multer  = require('multer');
var http  = require('http');
var redirect = require("express-redirect");
redirect(app);
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
			// deleteFolderRecursive('./tmp/');
		}
	});

mongoose.connect('mongodb://localhost:27017/ttc-onboarding');
var deleteFolderRecursive = function(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

var gfs = Grid(db.db, mongoose.mongo);

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
	app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
	app.use(morgan('dev')); 										// log every request to the console
	app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
	app.use(bodyParser.json()); 									// parse application/json
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
	app.use(methodOverride());
	app.use(multer({ dest: './tmp/'}));
	// app.use(busboy());
}

var router = express.Router(); 				// get an instance of the express Router

app.use('/api', router);
app.get("/api/blogs", blog_api.findAll);
app.post('/api/blogs/add', blog_api.add);
app.get("/api/blogs/:id", blog_api.findbyId);
app.delete('/api/blogs/delete/:id', blog_api.delete);
app.get('/api/posts', post_api.findAll);
app.get('/api/posts/:id', post_api.findbyBlog);
// app.redirect('/api/posts/add', '/');

app.post('/api/posts/add', function(req, res, next){
	// console.log(req.params);
	var Post = require('./controllers/post.js');
	if(req.files){
		console.log(req.files);
		console.log(req.body);
		var name =req.files.file.name;
		var localpath =req.files.file.path;
		var writestream = gfs.createWriteStream({filename: name});
		var fsstream = fs.createReadStream(localpath)
		fsstream.pipe(writestream);
		fsstream.on('close', function(){
		   fs.unlink(localpath);
		});
	}
	var postinstance = new Post({blog_id: req.body.blogid, text:req.body.newposttext, img:req.files.file.name});
	postinstance.save(function(err, post){
    	if (err){
		res.send(err);
		}else{
			res.send(post);
		}
	});
});

app.delete('/api/posts/delete/:id', 	function(req, res){
		var Post = require('./controllers/post.js');
	Post.remove({_id: req.params.id}, function (err) {
	  if (err){
	  	res.send(err);
	  }else{
	  	console.log('deleted!');
	  }
	});
});

app.get('/downloads/:name', function(req, res) {
	// console.log(req.params);
	var readstream = gfs.createReadStream({
		filename: req.params.name
	});
	// console.log(readstream);
	var bufs = [];
	readstream.on('data', function(chunk){
		bufs.push(chunk);
	}).on('end', function () {
		var fbuf = Buffer.concat(bufs);
		res.send(fbuf);
	});
});

app.delete('/downloads/:name', function(req,res){
	gfs.remove({filename: req.params.name}, function (err) {
	  if (err) return handleError(err);
	  console.log('image deleted');
	});
});

app.listen(2020);
console.log("App listening on port 2020");

