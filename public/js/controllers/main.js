angular.module('todoController', [])

	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {

		$scope.loading = false;
		$scope.input_data = {};
		$scope.results = {};

		$scope.search = function(key){
			$scope.loading = true;
			Todos.search($scope.input_data)
				.success(function(data) {
					$scope.loading = false;
					$scope.results = data;
				});
		}
	}]);