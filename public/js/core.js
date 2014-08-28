var ttc_onboarding = angular.module('TTCOnboarding', ['directives', 'angularFileUpload']);

function mainCtrl($scope, $http, $upload) {
	$scope.title = "Micro-Blog";
	$scope.browse_blog_id = null;
	$scope.new_post = {};
	$scope.new_blog = {};
	$scope.post_blog = [];
	$scope.files = {};
	initialize();
	function initialize(){
		$http.get('/api/blogs').success(function(data) {
			console.log(data);
			if (data.length){
				for (i =0; i<data.length; i++){
					data[i].id = data[i]._id;
					if (i == 0){
						$scope.browse_blog_id = data[i].id;
						$scope.blog_title = data[i].username;
					}
				}
			}
			$scope.blogs = data;
			$http.get('/api/posts/'+$scope.browse_blog_id).success(function(data) {
				console.log(data);
				if (data.length){
					for (i =0; i<data.length; i++){
						data[i].id = data[i]._id;
					}
				}
				$scope.post_blog = data;
			}).error(function(data) {
				console.log('Error: ' + data);
			});
		}).error(function(data) {
			console.log('Error: ' + data);
		});

		$http.get('/api/posts').success(function(data) {
			console.log(data);
			if (data.length){
				for (i =0; i<data.length; i++){
					data[i].id = data[i]._id;
				}
			}
			$scope.posts = data;
		}).error(function(data) {
			console.log('Error: ' + data);
		});
	}

	$scope.newBlog = function (blog){
		console.log("new blog",blog);
		$http.post('api/blogs/add', blog).success(function(){
			console.log('success');
		}).error(function(err){
			console.log(err);
		});
	}

	$scope.newPost = function (post){
		post.blog_id = $scope.browse_blog_id;
		console.log("new post", post);
		$http.post('api/posts/add', post).success(function(){
			console.log('success');
		}).error(function(err){
			console.log(err);
		});
	}

	$scope.changeBlog = function(blog){
		$scope.browse_blog_id = blog.id;
		$scope.blog_title = blog.username;
		$http.get('/api/posts/'+$scope.browse_blog_id).success(function(data) {
				console.log(data);
				if (data.length){
					for (i =0; i<data.length; i++){
						data[i].id = data[i]._id;
					}
				}
				$scope.post_blog = data;
			}).error(function(data) {
				console.log('Error: ' + data);
			});
	}

	$scope.deletePost = function(post){
		$http.delete('api/posts/delete/'+post.id);
	}

	$scope.filesChanged = function(elm){
		$scope.files = elm.files;
		console.log($scope.files);
	}

};


function MyCtrl ($scope, $upload, $http) {
  $scope.onFileSelect = function($file) {
  	var file = $file;
   $http.post('api/posts/add', file).success(function(){
			console.log('success');
		}).error(function(err){
			console.log(err);
		});
  };
};

