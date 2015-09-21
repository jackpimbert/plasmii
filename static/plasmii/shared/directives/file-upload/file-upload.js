angular.module('plasmii.directives').directive('fileUpload', function () {
	return {
		require: ['Upload', 'CONSTANTS'],
		restrict: 'EA',
		scope: {
			uploadedFile: '=',
			small: '@'
		},
		controller: function ($scope, Upload, CONSTANTS) {
			$scope.CONSTANTS = CONSTANTS;
			$scope.uploading = false;
			$scope.upload = function (files) {
				if (files && files.length) {
					$scope.uploading = true;
					var file = files[0];
					Upload.upload({
						url: '/api/upload/',
						file: file
					}).success(function (data, status, headers, config) {
						$scope.uploading = false;
						$scope.uploadedFile = data;
					});
				}
			};
			$scope.clear = function () {
				$scope.uploadedFile = {};
			};
		},
		templateUrl: 'file-upload.html'
	};
});

