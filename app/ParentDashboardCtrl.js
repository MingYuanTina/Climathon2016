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
        {
            latLng: [43.730849, -79.577471],
            show: true
        }, {
            latLng: [43.725918, -79.566472],
            show: true
        }, {
            latLng: [43.726158, -79.561762],
            show: true
        }, {
            latLng: [43.7286572,-79.5685916],
            show: true
        }
    ];
    $scope.routeList = [];

    var dest = []; // stores selected destination
    var routes = []; // stores the available routes
    var selectedRoute = {}; // stores the currently selected route

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

    $scope.selectDest = function($event, destMarker) {
        $scope.destination = destMarker;
        $http.get("/api/routeList", {
            params: {
                destLoc: $scope.destination.latLng[0] + "," + $scope.destination.latLng[1],
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

    $scope.showHideDest = function() {
        for (var destElem in $scope.destArr) {
            $scope.destArr[destElem].show = $scope.destination.length === 0 ||
                $scope.destArr[destElem] == $scope.destination;
        }
    };

    $scope.showHideDest = function() {
        if (destMarker == $scope.destination) return true;
        return false;
    };
}]);
