const express = require('express');
const bodyParser = require('body-parser')


const app = express();
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/home', function (req, res) {
   debugger
   fs.readFile(__dirname + "/" + "server/data.json", 'utf8', function (err, data) {
      console.log(data);
      res.end(data);
   });
})

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})