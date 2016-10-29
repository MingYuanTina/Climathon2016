var express = require('express');

var app = express();

var sampleRouteList = [
    {
        driver: "some guy",
        spaces: 3,
        startLoc: [43.730849, -79.577471],
        destLoc: [43.729797, -79.569247]
    }, {
        driver: "some guy2",
        spaces: 2,
        startLoc: [43.725918, -79.566472],
        destLoc: [43.729797, -79.569247]
    }, {
        driver: "some guy3",
        spaces: 1,
        startLoc: [43.732111, -79.561827],
        destLoc: [43.729797, -79.569247]
    }, {
        driver: "some guy4",
        spaces: 1,
        startLoc: [43.732111, -79.561827],
        destLoc: [43.727447, -79.562388]
    }, {
        driver: "some guy5",
        spaces: 1,
        startLoc: [43.725865, -79.568505],
        destLoc: [43.727447, -79.562388]
    }, {
        driver: "some guy6",
        spaces: 1,
        startLoc: [43.722321, -79.563684],
        destLoc: [43.727447, -79.562388]
    }
];



app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/node_modules/'));
app.use(express.static(__dirname + '/app/'));
app.use(express.static(__dirname + '/views/'));

// link to DB (currently not implemented)
var db = {
    validateUser: function(userName, password) {
        // TODO query DB for validation
        return {
            userName: userName,
            accessToken: "54321"
        };
    },
    getRouteList: function() {
        return sampleRouteList;
    }
};

// checks DB to validate userName and password
app.get("/api/login/", function(req, res) {
    res.send(db.validateUser(req.params.userName, req.params.password));
});

app.get("/api/addRoute", function (req, res) {
    var newData = {
            driver: req.query.driver,
            seats: req.query.seats,
            startLoc: req.query.startLoc.split(','),
            destLoc: req.query.destLoc.split(',')
        };
    newData.startLoc[0] = Number(newData.startLoc[0]);
    newData.startLoc[1] = Number(newData.startLoc[1]);
    newData.destLoc[0] = Number(newData.destLoc[0]);
    newData.destLoc[1] = Number(newData.destLoc[1]);
    sampleRouteList.push(newData);

    console.log(sampleRouteList);

    return res.send(sampleRouteList);

});

function calcDistance(loc1, loc2) {
    var lat = 0, lng = 1;

    console.log(loc1);
    console.log(loc2);

    console.log(Math.pow(Number(loc1[lat]) - Number(loc2[lat]), 2) +
    Math.pow(Number(loc1[lng]) - Number(loc2[lng]), 2));

    return Math.pow(Number(loc1[lat]) - Number(loc2[lat]), 2) +
    Math.pow(Number(loc1[lng]) - Number(loc2[lng]), 2);
}

// Returns list of routes, calculates the distance from given locn
app.get("/api/routeList", function(req, res) {
    console.log(req.query);
    var startLoc = req.query.startLoc.split(',');
    var destLoc = req.query.destLoc.split(',');
    var routeList = db.getRouteList();

    for(var routeElem in routeList) {
        routeList[routeElem].distVal = calcDistance(destLoc, routeList[routeElem].startLoc);
    }

    res.json(routeList);
});

// app hosted on localhost:3000
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
