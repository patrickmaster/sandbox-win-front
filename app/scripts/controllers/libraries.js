'use strict';

/**
 * @ngdoc function
 * @name sandboxApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sandboxApp
 */
angular.module('sandboxApp').controller('LibrariesCtrl', function ($scope, libraries, platforms) {

    $scope.librariesList = libraries;

    $scope.getPlatform = function (id) {
        for (var i = 0; i < platforms.length; i++) {
            if (platforms[i].ID === id) {
                return platforms[i];
            }
        }
    };

    $scope.editItem = function (item) {
        item.$previous = item.Name;
        item.$edit = true;
        $scope.isEditMode = true;
    };

    $scope.acceptEdit = function (item) {
        item.$update().then(function () {
            item.$edit = false;
            $scope.isEditMode = false;
        });
    };

    $scope.rollbackEdit = function (item) {
        item.Name = item.$previous;
        item.$edit = false;
        $scope.isEditMode = false;
    };

    $scope.deleteItem = function (item) {
        for (var i = 0; i < libraries.length; i++) {
            if (libraries[i] === item) {
                item.$delete().then(function (i) {
                    libraries.splice(i, 1);
                }.bind(null, i));
            }
        }
    };

});
