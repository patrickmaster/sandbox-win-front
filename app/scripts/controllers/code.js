'use strict';

/**
 * @ngdoc function
 * @name sandboxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sandboxApp
 */
angular.module('sandboxApp').controller('CodeCtrl', function ($scope, platforms, libraries, operation, $interval) {
    
    $scope.platforms = platforms;
    $scope.libraries = libraries;
    $scope.code = null;
    $scope.executionResult = null;
    
    $scope.requestExecution = function () {
        operation.post({
            Platform: $scope.selectedPlatform.Id,
            ReturnType: 1,
            Code: $scope.code
        }, function (data) {
            pullResult(data.Id);
        });
    };

    var intervalPromise;

    function pullResult(id) {
        intervalPromise = $interval(function () {
            operation.get({id: id}, function (data) {
                putResult(data);
                $interval.cancel(intervalPromise);
            });
        }, 500);
    }
    
    function putResult(data) {
        $scope.executionResult = data;
    }
    
    $scope.selectedPlatform = $scope.platforms[0];
    
});
