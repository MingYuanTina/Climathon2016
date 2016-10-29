var app = angular.module("RideAlong");

app.controller("ParentDashboardSearchCtrl", ["$scope", "DropOffLocnService", "$http", "NavigatorGeolocation",
function($scope, DropOffLocnService, $http, NavigatorGeolocation) {
    var allDestArr = [
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
    var allDepartArr = [];

    // all other routes match this format

    $scope.origin = "current-position";
    $scope.startLoc = []; // user's position according to browser
    $scope.departLoc = {}; // user's selected departure location for the route
    $scope.showDirections = false;

    NavigatorGeolocation.getCurrentPosition().then(function(position) {
        $scope.startLoc = [position.coords.latitude, position.coords.longitude];
        console.log($scope.startLoc);
    }, function(error) {
        console.log("cannot get current location");
    });

    $scope.destination = [];
    $scope.schoolLoc = [43.7286572,-79.5685916];
    $scope.destArr = allDestArr.slice();
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
            allDepartArr = response.data;
            showHideDest();
            showHideDepart();
        }, function(error) {
            console.log("an error occurred getting the routeList from the server");
        });
    };

    function showHideDest() {
        var newArray = [];
        for (var destElem in allDestArr) {
            if (Object.keys($scope.destination).length === 0 ||
                allDestArr[destElem] == $scope.destination)
                newArray.push(allDestArr[destElem]);
        }
        $scope.destArr = newArray;
    }

    function showHideDepart() {
        var newArray = [];
        for (var routeElem in allDepartArr) {
            if (Object.keys($scope.destination).length !== 0 &&
                (Object.keys($scope.departLoc).length === 0 ||
                allDepartArr[routeElem] == $scope.departLoc));
            newArray.push(allDepartArr[routeElem]);
        }
        $scope.routeList = newArray;
    }

    $scope.clearDest = function() {
        $scope.destination = {};
        showHideDest();
        showHideDepart();
    };
}]);
