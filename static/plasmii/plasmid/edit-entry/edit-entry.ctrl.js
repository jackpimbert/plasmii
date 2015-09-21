angular.module('plasmii.plasmid').controller('EditPlasmidEntryController', function($scope, $routeParams, CommonService, PlasmidEntryService, ErrorAlert, User, CONSTANTS){
	// Initialisation function for the whole controller
	$scope.CONSTANTS = CONSTANTS;
	$scope.inProgress = false;

	ErrorAlert.init($scope);
	$scope.closeAlert = function($index) { ErrorAlert.closeAlert($scope, $index); };

	$scope.entry = PlasmidEntryService.getPlasmidEntry($scope, $routeParams.entryId);
	console.log($scope.entry);
	$scope.update = function () { PlasmidEntryService.updatePlasmidEntry($scope) };


	$scope.unbindExitConfirm = CommonService.bindExitConfirm($scope);

});
