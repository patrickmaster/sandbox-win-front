'use strict';

/**
 * @ngdoc service
 * @name sandboxApp.returntype
 * @description
 * # returntype
 * Factory in the sandboxApp.
 */
angular.module('sandboxApp').factory('returntype', function (apiUrl, $resource) {
   
    return $resource(apiUrl + '/returntype/:id');

});
