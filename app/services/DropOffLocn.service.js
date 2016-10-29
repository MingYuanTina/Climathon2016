var app = angular.module("RideAlong");

app.factory("DropOffLocnService", [function() {
    var school = [43.748481, -79.328680];
    return {
        getDropOffLocns: function() {
            // will eventually pull data from DB
            return [school];
        }
    };
}]);
