'use strict';

/**
 * @ngdoc function
 * @name rectMultiSelectApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rectMultiSelectApp
 */
angular.module('rectMultiSelectApp')
  .controller('MainCtrl', function ($scope) {

    $scope.moveSelect = false;

    $scope.baseUrl = "http://static.photoshows.cn/";
    $scope.baseExt = "@1e_200w_200h_1c_1o.jpg";
    $scope.photos = [
      {name: '408.jpg'},{name: '409.jpg'},{name: '410.jpg'},{name: '411.jpg'},{name: '412.jpg'},{name: '413.jpg'},{name: '414.jpg'},{name: '415.jpg'},{name: '416.jpg'},{name: '417.jpg'},{name: '418.jpg'},{name: '419.jpg'},{name: '420.jpg'},{name: '421.jpg'},{name: '422.jpg'},{name: '423.jpg'},{name: '424.jpg'},{name: '425.jpg'},{name: '426.jpg'},{name: '427.jpg'},{name: '428.jpg'},{name: '429.jpg'},{name: '430.jpg'},{name: '431.jpg'},{name: '432.jpg'},{name: '433.jpg'},{name: '434.jpg'},{name: '435.jpg'},{name: '436.jpg'},{name: '437.jpg'},{name: '438.jpg'},{name: '439.jpg'},{name: '440.jpg'},{name: '441.jpg'},{name: '442.jpg'},{name: '443.jpg'},{name: '444.jpg'},{name: '445.jpg'},{name: '446.jpg'},{name: '447.jpg'},{name: '448.jpg'},{name: '449.jpg'},{name: '450.jpg'},{name: '451.jpg'},{name: '452.jpg'}
    ];

    $scope.selectedPhotos = [];

    $scope.setSelectable = function(selectable) {
      $scope.selectable = selectable;
    };
  });
