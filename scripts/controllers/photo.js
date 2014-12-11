'use strict';

/**
 * @ngdoc function
 * @name rectMultiSelectApp.controller:PhotoctrlCtrl
 * @description
 * # PhotoctrlCtrl
 * Controller of the rectMultiSelectApp
 */
angular.module('rectMultiSelectApp')
  .controller('PhotoCtrl', ['$scope', '$log', function ($scope, $log) {

    $scope.select = function () {

      var photo = $scope.photo;
      //photo.actionSelected = !photo.actionSelected;
      if (photo.actionSelected) {
        $scope.setSelectable(true);
        $scope.selectedPhotos.push(photo);
      } else {
        for (var i = $scope.selectedPhotos.length - 1; i >= 0; i -= 1) {
          if($scope.selectedPhotos[i].name == photo.name) {
            delete $scope.selectedPhotos.splice(i, 1);
          }
        }
        if ($scope.selectedPhotos.length == 0) {
          $scope.setSelectable(false);
        }
      }
    };

    $scope.$watch('photo.actionSelected', function(selected) {
      $scope.select();
    });

  }]);
