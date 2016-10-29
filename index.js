var express = require('express');

var app = express();

app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/node_modules/'));
app.use(express.static(__dirname + '/app/'));
app.use(express.static(__dirname + '/views/'));

// link to DB (currently not implemented)
var db = {
    validateUser: function(userName, password) {
        // TODO query DB for validation
        return true;
    }
};

// checks DB to validate userName and password
app.get("/api/login", function(req, res) {
    res.json(db.validateUser(req.userName, req.password));
});

// app hosted on localhost:3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
