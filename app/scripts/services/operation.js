'use strict';

/**
 * @ngdoc service
 * @name sandboxApp.operation
 * @description
 * # operation
 * Factory in the sandboxApp.
 */
angular.module('sandboxApp').factory('operation', function (apiUrl, $resource) {
    return $resource(apiUrl + '/operation/:id', null, {
        post: {method: 'POST'}
    });
});
