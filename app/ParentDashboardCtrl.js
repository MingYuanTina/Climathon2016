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

    var dest = []; // stores selected destination
    var routes = []; // stores the available routes
    var selectedRoute = {}; // stores the currently selected route

    function updateRouteList() {
        // needs to fetch new routelist from backend
    }

    $scope.dropOffLocns = DropOffLocnService.getDropOffLocns();
    $scope.selectDest = function(e, dest) {
        $scope.dest = dest;
        updateRouteList();
    };
}]);
