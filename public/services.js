angular
    .module('services', ['angularFileUpload'])
    .controller('fileCtrl', function($scope, FileUploader) {
        $scope.uploader = new FileUploader();
    });
    