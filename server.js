var express = require('express');
var fs = require('fs');

var app = express();

app.get("/", function(req, res){
    fs.readFile(__dirname + '/index.html', 'utf8', function(err, html){
         res.send(html);
    })
    console.log('connected');
})

app.listen(process.env.PORT);