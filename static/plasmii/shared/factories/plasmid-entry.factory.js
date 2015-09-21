angular.module('plasmii.factories').factory('PlasmidEntry', [
        '$resource',
        function($resource){
			return $resource('/api/plasmid-entry/:entryId/',
                { entryId: '@id'},
                { update: { method: 'PUT' }, query: { method:'GET', isArray:false }},
				{ stripTrailingSlashes: false });
        }
]);

