'use strict';

/**
 * @ngdoc directive
 * @name sandboxApp.directive:activeTab
 * @description
 * # activeTab
 */
angular.module('sandboxApp').directive('navTab', function () {
    
    var activeTab = null;
    
    return {
        restrict: 'A',
        scope: {},
        controller: function ($scope, $route) {
            $scope.$route = $route;
        },
        link: function postLink(scope, element, attrs) {
            var tabName = attrs.activeTab;
            scope.$watch('$route.current', function (route) {
                if (route && route.tab === tabName) {
                    if (activeTab) {
                        activeTab.removeClass('active');
                    }
                    
                    activeTab = element;
                    element.addClass('active');
                }
            });
        }
    };
});
