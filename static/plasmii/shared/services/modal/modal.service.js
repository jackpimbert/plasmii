angular.module('plasmii.services').service('ModalService', function($modal) {

	this.confirmDialog = function (modalTitle, modalMessage, size) {
		var modalOptions = {
			modalTitle: modalTitle,
			modalMessage: modalMessage,
			templateUrl: 'confirmModal.html',
			size: size
		};

		modalOptions.controller = function($scope, $modalInstance) {
			$scope.modalOptions = modalOptions;
			$scope.modalOptions.ok = function(result) { $modalInstance.close(); };
			$scope.modalOptions.close = function(result) { $modalInstance.dismiss(); };
		};

		return $modal.open(modalOptions).result;
	}

	this.errorDialog = function (modalTitle, modalMessage, size) {
		var modalOptions = {
			modalTitle: modalTitle,
			modalMessage: modalMessage,
			templateUrl: 'errorModal.html',
			size: size
		};

		modalOptions.controller = function($scope, $modalInstance) {
			$scope.modalOptions = modalOptions;
			$scope.modalOptions.ok = function(result) { $modalInstance.close(); };
		};

		return $modal.open(modalOptions).result;
	}

});
