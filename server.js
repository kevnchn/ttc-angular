// server.js

// set up ========================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var morgan = require('morgan'); 			// log requests to the console (express4)
var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

var blog_api = require('./models/blog_api.js'),
    post_api = require('./models/post_api.js');

// configuration =================

// listen (start app with node server.js) ======================================


mongoose.connect('mongodb://localhost:27017/ttc-onboarding', 
	function(err){
		if (err){
			console.log(err);
		}else{
			console.log('successfully connected');
		}
	});

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
	// app.use(express.favicon(__dirname + '/public/img/spfavicon.ico'));
	app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
	app.use(morgan('dev')); 										// log every request to the console
	app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
	app.use(bodyParser.json()); 									// parse application/json
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
	app.use(methodOverride());
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
app.post('/api/posts/add', post_api.add);
app.delete('/api/posts/delete/:id', post_api.delete);


app.listen(2020);
console.log("App listening on port 2020");
