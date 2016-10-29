var app = angular.module("RideAlong");

app.controller("ParentDashboardSearchCtrl", ["$scope", "DropOffLocnService", "$http", "NavigatorGeolocation",
function($scope, DropOffLocnService, $http, NavigatorGeolocation) {
    // all other routes match this format
    
    $scope.origin = "current-position";
    $scope.startLoc = [];

    NavigatorGeolocation.getCurrentPosition().then(function(position) {
        $scope.startLoc = [position.coords.latitude, position.coords.longitude];
        console.log($scope.startLoc);
    }, function(error) {
        console.log("cannot get current location");
    });

    $scope.destination = [];
    $scope.schoolLoc = [43.7286572,-79.5685916];
    $scope.destArr = [
        [43.730849, -79.577471],
        [43.725918, -79.566472],
        [43.726158, -79.561762],
        [43.7286572,-79.5685916]
    ];

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
        $scope.destination = [e.latLng.lat(), e.latLng.lng()];
        $scope.$apply();
        $http.get("/api/routeList", {
            params: {
                destLoc: $scope.destination[0] + "," + $scope.destination[1],
                startLoc: $scope.startLoc[0] + "," + $scope.startLoc[1]
            }
        }).then(function(response) {
            console.log("successfully got routeList");
            console.log(response.data);
            $scope.routeList = response.data;
        }, function(error) {
            console.log("an error occurred getting the routeList from the server");
        });
    };
}]);
