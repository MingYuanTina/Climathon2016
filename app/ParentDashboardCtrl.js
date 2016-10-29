var app = angular.module("RideAlong");

app.controller("ParentDashboardCtrl", ["$scope", "DropOffLocnService",
function($scope, DropOffLocnService) {
    // all other routes match this format
    var locArr = [
      [43.730849, -79.577471],
      [43.725918, -79.566472],
      [43.726158, -79.561762]
    ]
    var sampleRoute = {
        driver: "some guy",
        spaces: 3,
        latLng: [5, 7]
    };

    $scope.origin = "";
    $scope.destination = "";
    $scope.schoolLoc = [43.7286572,-79.5685916];
    $scope.locArr = [
     [43.730849, -79.577471],
     [43.725918, -79.566472],
     [43.726158, -79.561762]
   ];

    console.log($scope.locArr);

    var dest = []; // stores selected destination
    var routes = []; // stores the available routes
    var selectedRoute = {}; // stores the currently selected route

    function updateRouteList() {
        // needs to fetch new routelist from backend
    }

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

    $scope.dropOffLocns = DropOffLocnService.getDropOffLocns();

    $scope.selectDest = function(e) {
        $scope.origin = e.latLng;
        $scope.destination = $scope.schoolLoc;
        $scope.$apply();

    };
}]);
