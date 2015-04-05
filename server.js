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

var things = [{
   name: 'Scotch' 
}, {
   name: 'Whiskey' 
}, {
   name: 'Bourbon' 
}];

var thingSchema = new mongoose.Schema({
   name: String 
});

var Thing = mongoose.model('Thing', thingSchema);

mongoose.connect('mongodb://localhost/my_app');
mongoose.connection.once('open', function(){
    Person.find({}, function(err, peopleResults){
        if (peopleResults.length == 0)
            Person.create(people, function(err, singleplatformers){
                Thing.create(things, function(err, spirits){
                    console.log(singleplatformers);
                    console.log(spirits);
                })
                
            });
        });
        console.log('connected')
    });

var app = express();

app.use(express.static(__dirname + '/client'));

app.get("/api/things", function(req, res){
    Thing.find({}, function(err, results){
        res.send(results);
    })
})

app.get("/api/people", function(req, res) {
    Person.find({}, function(err, results) {
        res.send(results);
    })
})

app.get("/api/people/:id", function(req, res){
    Person.findById(req.params.id, function(err, result){
        res.send(result);
    })
})

app.get("/", function(req, res){
    fs.readFile(__dirname + '/index.html', 'utf8', function(err, html){
         res.send(html);
    })
})

app.listen(process.env.PORT);