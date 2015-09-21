angular.module('plasmii.services').service('CommonService', function($location, $http, CONSTANTS) {
	var service = this; // We assign the service var to 'this', so that we can access 'this' in callbacks.

	service.bindExitConfirm = function ($scope) {
		return $scope.$on('$locationChangeStart', function( event ) {
			var answer = confirm("Are you sure you want to leave this page?");
			if (!answer) {
				event.preventDefault();
			}
		});
	};
});
