
var app = angular.module("RideAlong");

app.controller("ParentDashboardPostCtrl", ["$scope", "DropOffLocnService", "$http", "NavigatorGeolocation",
function($scope, DropOffLocnService, $http, NavigatorGeolocation) {

$scope.parentName = "";
$scope.seats = "";


  $scope.mycallback = function(map) {
      $scope.mymap = map;
      $scope.$apply();
  };



  $scope.fromChanged = function() {
      //console.log(this.getPlace().geometry.location);
      $scope.origin = this.getPlace().geometry.location;
      $scope.$apply();
  };

  $scope.toChanged = function() {
      //console.log(this.getPlace().geometry.location);
      $scope.destination = this.getPlace().geometry.location;
      $scope.$apply();
  };

  $scope.submitPost = function () {

    console.log($scope.parentName);
    $http.get("/api/addRoute", {params: {
      driver: $scope.parentName,
      seats: $scope.seats,
      startLoc: $scope.origin,
      destLoc: $scope.destination
    }}).then(function (data) {
      console.log(data);
    })
  };

}]);
