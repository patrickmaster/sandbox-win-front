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
    $scope.selectedPlatform = $scope.platforms[0];
    $scope.waitingForResult = false;
    $scope.useCodeWrapper = true;

    $scope.requestExecution = function () {
        $scope.waitingForResult = true;
        operation.post({
            Platform: $scope.selectedPlatform.ID,
            Libraries: getLibraries(),
            Code: $scope.code,
            UseWrapper: $scope.useCodeWrapper
        }, function (data) {
            pullResult(data.ID);
        });
    };

    function getLibraries() {
        var libs = [];
        for (var i = 0; i < $scope.libraries.length; i++) {
            if ($scope.libraries[i].selected && $scope.libraries[i].Platform === $scope.selectedPlatform.ID) {
                libs.push($scope.libraries[i]);
            }
        }

        return libs;
    }

    function pullResult(id) {
        $timeout(function () {
            operation.get({id: id}, function (data) {
                if (typeof data.Result !== 'undefined' || typeof data.Error !== 'undefined') {
                    putResult(data);
                    $scope.waitingForResult = false;
                }
                else {
                    pullResult(id);
                }
            }, function () {
                $scope.waitingForResult = false;
                putResult({Error: 'Nieoczekiwany błąd'});
            });
        }, 500);
    }

    function putResult(data) {
        if (data.Error) {
            $scope.executionResult = data.Error;
            $scope.executionStatus = 'execution-failure';
        }
        else {
            $scope.executionResult = data.Result;
            $scope.executionStatus = 'execution-success';
        }
    }

});
