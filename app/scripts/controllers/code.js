'use strict';

/**
 * @ngdoc function
 * @name sandboxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sandboxApp
 */
angular.module('sandboxApp').controller('CodeCtrl', function ($scope, platforms, libraries, operation, $timeout) {

    $scope.platforms = platforms;
    $scope.libraries = libraries;
    $scope.code = null;
    $scope.executionResult = null;
    $scope.executionStatus = null;

    $scope.requestExecution = function () {
        operation.post({
            Platform: $scope.selectedPlatform.Id,
            ReturnType: 1,
            Code: $scope.code
        }, function (data) {
            pullResult(data.Id);
        });
    };
    
    function pullResult(id) {
        $timeout(function () {
            operation.get({id: id}, function (data) {
                if (typeof data.Result !== 'undefined' || typeof data.Exception !== 'undefined') {
                    putResult(data);
                }
                else {
                    pullResult(id);
                }
            });
        }, 500);
    }

    function putResult(data) {
        if (data.Exception) {
            $scope.executionResult = data.Exception;
            $scope.executionStatus = 'execution-failure';
        }
        else {
            $scope.executionResult = data.Result;
            $scope.executionStatus = 'execution-success';
        }
    }

    $scope.selectedPlatform = $scope.platforms[0];

});
