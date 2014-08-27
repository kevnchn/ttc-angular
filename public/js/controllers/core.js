function mainCtrl ($scope, $location, mongoServer, string, Page){
	$scope.user = mongoServer.
	Page.setTitle("Tweets | TTC On-Boarding");
	$scope.browse_index = 0;
	$scope.current_blog = {};

	function initialize() {
		mongoServer.getAllBlogs().then(function(result){
			for (var i = 0; i < result.length; i++) {
				if (i==0){
					$scope.current_blog = result[i];
				}
				// result[i].active = false;
				result[i].id = result[i]._id;
				mongoServer.getPostsById('result[i]._id').then(function(posts){
					result[i].posts = posts; 
				});
			}
		});
		$scope.blogs = result;
	}
};