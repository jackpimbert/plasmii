angular.module('plasmii.factories').factory('User', [
		'$resource',
		function($resource) {
			return $resource('/api/user/', {},
				{ query: { method: 'GET', isArray:false }},
				{ stripTrailingSlashes: false});
		}
]);
