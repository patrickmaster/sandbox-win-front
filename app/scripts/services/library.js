'use strict';

/**
 * @ngdoc service
 * @name sandboxApp.library
 * @description
 * # library
 * Factory in the sandboxApp.
 */
angular.module('sandboxApp').factory('library', function (apiUrl, $resource) {
    return $resource(apiUrl + '/library/:id', {id: '@ID'}, {
        update: {method: 'PUT'}
    });
});
