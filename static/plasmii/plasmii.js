var app = angular.module('plasmii', [
	'ngRoute',
	'ngResource',
	'ngFileUpload',
	'ui.bootstrap',
	'plasmii.factories',
	'plasmii.directives',
	'plasmii.services',
	'plasmii.plasmid'
]);

app.constant('CONSTANTS', {
	'STATIC_URL': '/static/',
	'MEDIA_URL': '/media/',
	'SHARED_TEMPLATES_DIR': 'plasmii/shared/templates/',
	'PLASMID_DIR': 'plasmii/plasmid/'
});

app.config( function($routeProvider, CONSTANTS){
    $routeProvider
        .when('/plasmid/list/', {
			templateUrl: CONSTANTS.STATIC_URL + CONSTANTS.PLASMID_DIR + '/list-entries/list-entries.html',
			controller: 'ListPlasmidEntriesController'
		})
        .when('/plasmid/create/', {
			templateUrl: CONSTANTS.STATIC_URL + CONSTANTS.PLASMID_DIR + '/create-entry/create-entry.html',
			controller: 'CreatePlasmidEntryController'
		})
        .when('/plasmid/:entryId/edit/', {
			templateUrl: CONSTANTS.STATIC_URL + CONSTANTS.PLASMID_DIR + '/edit-entry/edit-entry.html',
			controller: 'EditPlasmidEntryController'
		})
        .when('/plasmid/:entryId/view/', {
			templateUrl: CONSTANTS.STATIC_URL + CONSTANTS.PLASMID_DIR + '/view-entry/view-entry.html',
			controller: 'ViewPlasmidEntryController'
		})
		.when('/unauthorised/', {
			templateUrl: CONSTANTS.STATIC_URL + CONSTANTS.SHARED_TEMPLATED_DIR + 'unauthorised.html'
		})
		.otherwise({
			redirectTo: '/plasmid/list'
		});
});

app.factory('errorInterceptor', ['$q', '$location', '$window', 'CONSTANTS',
    function ($q, $location, $window, CONSTANTS) {
        return {
            responseError: function (response) {
                if (response && response.status === 403) {
					if (response.data.detail === 'Authentication credentials were not provided.') {
						$location.path('/login/');
					} else {
						// User is authenticated but does not have the correct permissions!
						$location.path('/unauthorised/');
					}
				}
                return $q.reject(response);
            }
        };
}]);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('errorInterceptor');
}]);
