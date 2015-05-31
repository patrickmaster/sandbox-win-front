'use strict';

/**
 * @ngdoc function
 * @name sandboxApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sandboxApp
 */
angular.module('sandboxApp').controller('LibrariesCtrl', function ($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
});
