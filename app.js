(function () { //IIFE prevents globals from bleeding into local scope
'use strict';
var x="Hello";
angular.module('myFirstApp', []) //connects to view via ng-app attribute in HTML tag

.controller('MyFirstController', function($scope /*$ for angular variables*/) {
  $scope.randomVar = "David"
  $scope.sayHello = function() {
    return "Hello, World!";
  }

}); //define view-model. connects via ng-controller attribute in a tag defining a region

})();
