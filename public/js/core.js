var ttc_onboarding = angular.module('TTCOnboarding', ['ui.bootstrap', 'directives']);

function mainCtrl($scope, $http, $modal) {
	$scope.title = "Micro-Blog";
	$scope.browse_blog_id = {};
	$scope.new_post = {};
	$scope.new_blog = {};
	$scope.post_blog = [];
	$scope.postsview = [];
	$scope.postsview[0] = [];
	$scope.postsview[1] = [];
	$scope.postsview[2] = [];
	$scope.files = {};
	$scope.newblogisCollapsed = true;
	$scope.image = '';

	initialize();

	function initialize(){
		$http.get('/api/blogs').success(function(data1) {
			$scope.browse_blog_id = data1[0]._id;
			console.log($scope.browse_blog_id);
			$scope.blog_title = data1[0].username;
			for(i=0; i<data1.length; i++){
				data1[i].id = data1[i]._id;
			}
			console.log('mod data', data1);
			$scope.blogs=data1;
			$http.get('/api/posts/'+$scope.browse_blog_id).success(function(data2) {
				console.log('post data',data2);
				if (data2.length){
					for (i =0; i<data2.length; i++){
						console.log(i, data2[i]);
						data2[i].id = data2[i]._id;
						if(data2[i].date)
							data2[i].content_date = moment(data2[i].date).format('MM Do[,] YYYY [@] hh[:]mmA');
					}
				}
				console.log(data2);
				$scope.post_blog = data2;
				for (j = 0; j<$scope.postsview.length; j++){
					for (i = 0; i<$scope.post_blog.length; i++){
						if (i % 3 == j){
							$scope.postsview[j].push($scope.post_blog[i]);
							console.log(''+j+' '+i+' '+$scope.postsview[j].text);
						}
					}
				}
			}).error(function(data) {
				console.log('Error: ' + data);
			});
		}).error(function(data) {
			console.log('Error: ' + data);
		});
	}


	$scope.newBlog = function (blog){
		console.log("new blog", blog);
		$http.post('api/blogs/add', blog).success(function(){
			console.log('success');
		}).error(function(err){
			console.log(err);
		});
	}

	$scope.openPostModal = function () {
		// elem.value = $scope.browse_blog_id;
		$('#blogid').blur();
		var modalInstance = $modal.open({
			templateUrl: 'NewPostModal.html',
			controller: PostModalInstanceCtrl,
			resolve: {
				newpost: function () {
					return $scope.new_post;
				},
				blogid: function (){
					return $scope.browse_blog_id;
				}
			}
		});
		modalInstance.result.then();
	}

	$scope.changeBlog = function(blog){
		$scope.browse_blog_id = blog.id;
		$scope.blog_title = blog.username;
		$http.get('/api/posts/'+$scope.browse_blog_id).success(function(data) {
				console.log(data);
				if (data.length){
					for (i =0; i<data.length; i++){
						data[i].id = data[i]._id;
						data[i].content_date = moment(data[i].date).format('MM Do[,] YYYY [@] hh[:]mmA');
					}
				}
				$scope.post_blog = data;
				
			}).error(function(data) {
				console.log('Error: ' + data);
			});
	}

	$scope.deletePost = function(post){
		$http.delete('api/posts/delete/'+post.id);
		$http.delete('downloads/'+post.img);

	}

	$scope.filesChanged = function(elm){
		$scope.files = elm.files;
		console.log($scope.files);
	}

	$scope.addblogID = function(num){
		var num1 = new Post({blogid: num});
		$http.post('api/posts/add', num);
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

var PostModalInstanceCtrl = function ($scope, $modalInstance, newpost, blogid, $http) {
	$scope.new_post = newpost;
	console.log('posts', $scope.new_post);
	$scope.blog_id = blogid;
	console.log($scope.blog_id);
	$scope.ok = function () {
		$modalInstance.close($scope.newPost($scope.new_post));
	};

	$scope.cancel = function () {
		$modalInstance.dismiss();
	};

	$scope.newPost = function (post){
		post.blog_id = $scope.blog_id;
		console.log("new post", post);
		$http.post('api/posts/add', post).success(function(){
			console.log('success');
		}).error(function(err){
			console.log(err);
		});
	}
};

