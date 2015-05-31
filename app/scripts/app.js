'use strict';

/**
 * @ngdoc overview
 * @name sandboxApp
 * @description
 * # sandboxApp
 *
 * Main module of the application.
 */
angular.module('sandboxApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
]).config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/code.html',
        controller: 'CodeCtrl',
        resolve: {
            platforms: function (platform) {
                return platform.query();
            },
            libraries: function (library) {
                return library.query();
            }
        }
    }).when('/libraries', {
        templateUrl: 'views/libraries.html',
        controller: 'LibrariesCtrl'
    }).otherwise({
        redirectTo: '/'
    });
});
