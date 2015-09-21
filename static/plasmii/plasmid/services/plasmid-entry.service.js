angular.module('plasmii.plasmid').service('PlasmidEntryService', function($filter, $modal, $location, PlasmidEntry, ModalService, ErrorAlert) {

	function update($scope) {
		$scope.inProgress = true;
		$scope.entry.$update(
			function(result) {
				$scope.unbindExitConfirm();
				$scope.inProgress = false;
				$location.path('/plasmid/list/');
			},
			function(error) {
				$scope.inProgress = false;
				ErrorAlert.addAlert($scope, error, 'danger');
			}
		);
	}

	function create($scope) {
		$scope.inProgress = true;
		var entry = new PlasmidEntry({
            name: $scope.entry.name,
            description: $scope.entry.description,
		});
		entry.$save(
			function(result) {
				$scope.unbindExitConfirm();
				$scope.inProgress = false;
				$location.path('/plasmid/list/');
			},
			function(error) {
				$scope.inProgress = false;
				ErrorAlert.addAlert($scope, error, 'danger');
			}
		);
	}

	this.createPlasmidEntry = function($scope) {
		if (true) {
			var title = 'Are you sure?';
			var msg = 'Click OK to confirm.';
			var size = 'm';
			ModalService.confirmDialog(title, msg, size).then(function (result) {
				create($scope);
			});
		} else {
			create($scope);
		}
	};

	this.updatePlasmidEntry = function($scope) {
		if (true) {
			var title = 'Are you sure?';
			var msg = 'Click OK to confirm.';
			var size = 'm';
			ModalService.confirmDialog(title, msg, size).then(function (result) {
				update($scope);
			});
		} else {
			update($scope);
		}
	};

	this.getPlasmidEntry = function($scope, id) {
		return PlasmidEntry.get({entryId: id},
			function(result) {},
			function(error) {
				ErrorAlert.addAlert($scope, error, 'danger');
			}
		);
	}
});
