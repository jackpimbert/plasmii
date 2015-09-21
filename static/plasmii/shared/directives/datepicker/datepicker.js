angular.module('plasmii.directives').directive('mydatepicker', function () {
	return {
		restrict: 'EA',
		scope: {
			dateLabel: '@',
			dateModel: '=',
			minDate: '=',
			maxDate: '=',
			small: '@'
		},
		controller: function ($scope) {
			$scope.open = function($event) {
				$event.preventDefault();
				$event.stopPropagation();
			    $scope.dtOpen = $scope.dtOpen ? false : true;
			};

			$scope.format = 'dd-MMMM-yyyy';
			$scope.rangeInfo = {};

			$scope.smallInput = function() {
				if ($scope.small === "true")
					return 'input-sm';
				else
					return '';
			};

			$scope.smallButton = function() {
				if ($scope.small === "true")
					return 'btn-sm';
				else
					return '';
			};

			$scope.smallWidth = function() {
				if ($scope.small === "true")
					return 'sm';
				else
					return '';
			};
		},
		templateUrl: 'datepicker.html'
	};
});

angular.module('plasmii.directives').directive('datepickerPopup', function (){
  return {
    restrict: 'EAC',
    require: 'ngModel',
    link: function(scope, element, attr, controller) {
      //remove the default formatter from the input directive to prevent conflict
      controller.$formatters.shift();
    }
  }
});

angular.module('plasmii.directives').directive('datepickerLocaldate', ['$parse', function ($parse) {
	// See: http://stackoverflow.com/questions/22623872/angular-ui-datepicker-adjusting-for-timezone
	// From: https://gist.github.com/weberste/354a3f0a9ea58e0ea0de
	var directive = {
		restrict: 'A',
		require: ['ngModel'],
		link: link
	};
	return directive;

	function link(scope, element, attr, ctrls) {
		var ngModelController = ctrls[0];

		// called with a JavaScript Date object when picked from the datepicker
		ngModelController.$parsers.push(function (viewValue) {
			if (!viewValue)
				return undefined;
			// undo the timezone adjustment we did during the formatting
			viewValue.setMinutes(viewValue.getMinutes() - viewValue.getTimezoneOffset());
			// we just want a local date in ISO format
			return viewValue;
			return viewValue.toISOString().substring(0, 10);
		});

		// called with a 'yyyy-mm-dd' string to format
		ngModelController.$formatters.push(function (modelValue) {
			if (!modelValue)
				return undefined;
			// date constructor will apply timezone deviations from UTC (i.e. if locale is behind UTC 'dt' will be one day behind)
			var dt = new Date(modelValue);
			// 'undo' the timezone offset again (so we end up on the original date again)
			dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
			return dt;
		});
	}
}]);
