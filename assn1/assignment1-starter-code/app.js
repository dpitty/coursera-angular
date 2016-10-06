(function() {
'use strict'

angular.module("MyApp", [])
.controller("MyController", MyController);

MyController.$inject = ['$scope'];
function MyController($scope) {
  $scope.lunchItems = "";
  $scope.message = "";
  $scope.rateLunch = function() {
    //console.log($scope.lunchItems.split(","));
    if ($scope.lunchItems == "") {
      $scope.message = "Please enter data first";
      return;
    }
    var numItems = $scope.lunchItems.split(",").length;
    if (numItems <= 3) {
      $scope.message = "Enjoy!";
    } else {
      $scope.message = "Too much!";
    }
  };
};
})();
