var controller = angular.module('todoCtrl', ['ui.bootstrap']);

controller.controller('mainCtrl', ['$scope', '$http', 'Todos', function($scope, $http, Todos) {

        $scope.formData = null;
        // $scope.formData = {};

        $scope.todos = {};

        // Load all todos on initial page load.
        Todos.get()
                .success(function(data) {
                        $scope.todos = data;
                });

        // Create a new todo item upon form submission.
        $scope.create = function() {

                if ($scope.formData) {

                        Todos.create($scope.formData)
                                .success(function(data) {
                                        $scope.formData = null;

                                        // Server returns updated list of todos.
                                        $scope.todos = data;
                                });
                }
        };

        // // Update an existing todo item.
        // $scope.update = function() {

        //         if ($scope.formData) {

        //                 Todos.update($scope.formData)
        //                         .success(function(data) {
        //                                 $scope.formData = null;
        //                                 $scope.todos = data;
        //                         });
        //         }
        // };

        // Mark a todo as completed upon checking it.
        $scope.complete = function(id) {

                Todos.complete(id)
                        .success(function(data) {
                                $scope.todos = data;
                        });
        };

        // Mark a todo as incomplete upon unchecking it.
        $scope.restore = function(id) {

                Todos.restore(id)
                        .success(function(data) {
                                $scope.todos = data;
                        });
        };
}]);
