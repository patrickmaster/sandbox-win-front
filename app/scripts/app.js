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
    'ngTouch',
    'ngFileUpload',
    'ui.bootstrap'
]).config(function ($routeProvider) {
    $routeProvider.when('/code', {
        templateUrl: 'views/code.html',
        controller: 'CodeCtrl',
        resolve: {
            platforms: function (platform) {
                return platform.query();
            },
            libraries: function (library) {
                return library.query();
            },
            returntypes: function (returntype) {
                return returntype.query();
            }
        },
        tab: 'code'
    }).when('/libraries', {
        templateUrl: 'views/libraries.html',
        controller: 'LibrariesCtrl',
        resolve: {
            libraries: function (library) {
                return library.query();
            },
            platforms: function (platform) {
                return platform.query();
            }
        },
        tab: 'libraries'
    }).when('/libraries/new', {
        templateUrl: 'views/libraries-form.html',
        controller: 'LibrariesFormCtrl',
        resolve: {
            libraryItem: function () {
                return null;
            },
            platforms: function(platform) {
                return platform.query();
            }
        }
    }).otherwise({
        redirectTo: '/code'
    });
});
