'use strict';

/**
 * @ngdoc service
 * @name sandboxApp.platform
 * @description
 * # platform
 * Factory in the sandboxApp.
 */
angular.module('sandboxApp').factory('platform', function ($resource, apiUrl) {
   
    return $resource(apiUrl + '/platform/:id');

});
