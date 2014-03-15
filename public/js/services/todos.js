var service = angular.module('todoService', []);

// Set up PATCH
service.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.headers.patch = {
	    'Content-Type': 'application/json;charset=utf-8'
	}
}]);

service.factory('Todos', ['$http', function($http) {

	return {
		get: function() {
			return $http.get('/api/todos');
		},
		create: function(data) {
			return $http.put('/api/todos', data);
		},
		// update: function(data) {
		// 	return $http.post('/api/todos/' + data.id, data);
		// },
		complete: function(id) {

			return $http({
				method: 'PATCH',
				url: '/api/todos/' + id,
				data: { completed: true }
			});
		},
		restore: function(id) {

			return $http({
				method: 'PATCH',
				url: '/api/todos/' + id,
				data: { completed: false }
			});
		}
	};
}]);
