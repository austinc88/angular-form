
var app = angular.module('myApp', ['ja.qr'])
  .controller('myCtrl', function($scope) {
    $scope.firstName= "John";
    $scope.lastName= "Doe";
    $scope.toValue = function() {
      return $scope.firstName + " " + $scope.lastName;
    } 
});
        