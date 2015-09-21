angular.module('plasmii.services').service('ErrorAlert', function() {

	this.init = function ($scope) {
		$scope.alerts = [];
	};

	this.addAlert = function($scope, error, type) {
		$scope.alerts.push({
			type: type,
			msg: 'Something went wrong! Please contact the site administrator if the problem continues - Error '+error.status+' ('+error.statusText+')'
		});
	};

	this.closeAlert = function ($scope, $index) {
		$scope.alerts.splice($index, 1);
	};
});
