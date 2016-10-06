(function() {
'use strict'

angular.module('DIExample', [])

.controller('DIController', DIController);

function DIController($scope, $filter, $injector) {
  $scope.name = "Whatever";
  $scope.toUpperCase = function() {
    console.log("toUpperCase on blur");
    var filterUp = $filter('uppercase'); /* Retrieves Angular $filter feature */
    $scope.name = filterUp($scope.name);
    /* $scope.name = $filter('uppercase')($scope.name); //? */
  };

  console.log($injector.annotate(DIController));/* Retrieves parameter text */

}

})();
