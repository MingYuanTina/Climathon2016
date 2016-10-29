var app = angular.module("RideAlong");

app.controller("ParentCtrl", ["$scope", function($scope) {
    $scope.userName = "";
    $scope.password = "";

    $scope.submit = function() {
        console.log("submitted username: " + $scope.userName);
        console.log("submitted password: " + $scope.password);
    };
}]);
