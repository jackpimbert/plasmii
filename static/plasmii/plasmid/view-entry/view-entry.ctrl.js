angular.module('plasmii.plasmid').controller('ViewPlasmidEntryController', function($scope, $routeParams, CommonService, PlasmidEntry, ErrorAlert, CONSTANTS){
	$scope.CONSTANTS = CONSTANTS;

	ErrorAlert.init($scope);
	$scope.closeAlert = function($index) { ErrorAlert.closeAlert($scope, $index); };

	$scope.entry = PlasmidEntry.get({entryId: $routeParams.entryId},
		function(result) {},
	   	function(err) {
			ErrorAlert.addAlert($scope, error, 'danger');
		}
	);
});
