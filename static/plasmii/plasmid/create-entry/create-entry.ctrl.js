angular.module('plasmii.plasmid').controller('CreatePlasmidEntryController', function($scope, CommonService, PlasmidEntry, PlasmidEntryService, ErrorAlert, CONSTANTS){
	$scope.CONSTANTS = CONSTANTS;
	$scope.entryList = PlasmidEntry.query();
	$scope.inProgress = false;

	ErrorAlert.init($scope);
	$scope.closeAlert = function($index) { ErrorAlert.closeAlert($scope, $index); };

	// Initialising new entry
	$scope.entry = {
		description: '',
		name: '',
	};

	$scope.create = function () { PlasmidEntryService.createPlasmidEntry($scope) };

	$scope.unbindExitConfirm = CommonService.bindExitConfirm($scope);
});
