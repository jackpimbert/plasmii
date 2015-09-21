angular.module('plasmii.plasmid').controller('ListPlasmidEntriesController', function($scope, $window, PlasmidEntry, ErrorAlert, CONSTANTS){
	$scope.CONSTANTS = CONSTANTS;
	$scope.entryList = PlasmidEntry.query();
	$scope.filter = {};
	$scope.rangeInfo = {};

	ErrorAlert.init($scope);
	$scope.closeAlert = function($index) { ErrorAlert.closeAlert($scope, $index); };

	// Default sorting order
	if(!$scope.order){
        $scope.order = "-id";
        $scope.reverse = false;
    }

	// Change sorting based on user input
    $scope.changeSorting = function(sortOn){
        if ($scope.order === sortOn){
            $scope.reverse = !$scope.reverse;
            $scope.order = ($scope.reverse ? "-" : "" ) + sortOn;
        } else {
            $scope.order = sortOn;
            $scope.reverse = false;
        }
    };
});
