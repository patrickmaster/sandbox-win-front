'use strict';

angular.module('sandboxApp').controller('LibrariesFormCtrl', function ($scope, libraryItem, library, platforms, Upload, apiUrl, $location) {
    $scope.platforms = platforms;
    $scope.platform = null;
    $scope.name = null;
    $scope.files = [];
    $scope.error = false;

    $scope.save = function () {
        if ($scope.files && $scope.files.length) {
            var file = $scope.files[0];
            $scope.error = false;

            Upload.upload({
                url: apiUrl + '/library',
                fields: {
                    Name: $scope.name,
                    Platform: $scope.platform.ID
                },
                file: file
            }).success(function (data, status) {
                $location.path('/libraries');
            }).error(function () {
                $scope.error = true;
            });
        }
    };
});