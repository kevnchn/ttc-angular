var ttc_onboarding = angular.module('TTCOnboarding', []);

function mainCtrl($scope, $http) {
	$scope.title = "Cool App";
	$scope.browse_blog_id = null;
	$scope.new_post = {};
	$scope.new_blog = {};
	$scope.post_blog = [];

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

};