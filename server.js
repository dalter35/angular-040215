var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose')

var people = [{
    name: 'Dave'
}, {
    name: 'Brian'
}, {
    name: 'Sean'
}];

var personSchema = new mongoose.Schema({
    name: String
});

var Person = mongoose.model('Person', personSchema);

mongoose.connect('mongodb://localhost/my_app');
mongoose.connection.once('open', function(){
    Person.find({}, function(err, results){
        if (results.length == 0)
            Person.create(people, function(err, singleplatformers){
                console.log(singleplatformers);
            });
        });
    });

var app = express();

app.use(express.static(__dirname + '/client'));

app.get("/api/people", function(req, res) {
    Person.find({}, function(err, results) {
        res.send(results);
    })
})

app.get("/", function(req, res){
    fs.readFile(__dirname + '/index.html', 'utf8', function(err, html){
         res.send(html);
    })
})

app.listen(process.env.PORT);