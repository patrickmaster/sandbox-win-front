'use strict';

/**
 * @ngdoc function
 * @name sandboxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sandboxApp
 */
angular.module('sandboxApp').controller('CodeCtrl', function ($scope, platforms, libraries, operation, $timeout, returntypes, Upload, apiUrl) {

    $scope.platforms = platforms;
    $scope.libraries = libraries;
    $scope.returntypes = returntypes;
    $scope.code = null;
    $scope.executionResult = null;
    $scope.executionStatus = null;
    $scope.selectedPlatform = $scope.platforms[0];
    $scope.selectedReturnType = null;
    $scope.waitingForResult = false;
    $scope.useCodeWrapper = true;
    $scope.inputMode = 'inline';
    $scope.sourceFiles = [];

    $scope.requestExecution = function () {
        $scope.waitingForResult = true;
        if ($scope.inputMode === 'inline') {
            queueInlineCode();
        }
        else {
            queueFileCode();
        }
    };

    function queueInlineCode() {
        operation.post({
            Platform: $scope.selectedPlatform.ID,
            Libraries: getLibraries(),
            Code: $scope.code,
            ReturnType: $scope.selectedReturnType.ID,
            UseWrapper: $scope.useCodeWrapper
        }, function (data) {
            pullResult(data.ID);
        });
    }

    function queueFileCode() {
        if ($scope.sourceFiles && $scope.sourceFiles.length) {
            Upload.upload({
                url: apiUrl + '/operation/file',
                fields: {
                    Platform: $scope.selectedPlatform.ID,
                    Libraries: getLibraries()
                },
                file: $scope.sourceFiles[0]
            }).success(function (data) {
                pullResult(data.ID);
            }).error(function () {
                $scope.executionStatus = 'execution-failure';
                $scope.executionResult = 'Nieoczekiwany błąd';
                $scope.waitingForResult = false;
            });
        }
    }

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
