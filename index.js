var express = require('express');

var app = express();

var sampleRouteList = [
    {
        driver: "some guy",
        spaces: 3,
        startLoc: [43.730849, -79.577471],
        destLoc: [43.748481, -79.328680]
    }, {
        driver: "some guy2",
        spaces: 2,
        startLoc: [43.725918, -79.566472],
        destLoc: [43.748481, -79.328680]
    }, {
        driver: "some guy3",
        spaces: 1,
        startLoc: [43.726158, -79.561762],
        destLoc: [43.748481, -79.328680]
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

app.post("/api/addRoute", function (req, res) {

  sampleRouteList.push(
    {
      driver: req.body.name,
      seats: req.body.seats,
      startLoc: req.body.start,
      destLoc: req.body.dest,
    }
  );

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
