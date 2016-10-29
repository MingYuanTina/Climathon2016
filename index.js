var express = require('express');

var app = express();

app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/node_modules/'));
app.use(express.static(__dirname + '/app/'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
