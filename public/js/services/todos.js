angular.module('todoService', [])

	.factory('Todos', ['$http',function($http) {
		return {
			search : function(todoData) {
				return $http.post('/api/todos', todoData);
			}
		}
	}]);