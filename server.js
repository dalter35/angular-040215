var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');

var personModel = require("./models/person")
var workoutModel = require("./models/workout")
var Person = personModel.Person;
var Workout = workoutModel.Workout;


var people = [{
    name: 'Dave'
}, {
    name: 'Brian'
}, {
    name: 'Sean'
}, {
    name: 'Christine'
}];

var workouts = [{
    name: 'Run',
    date: '04/07/15',
    count: 0
},{
    name: 'Chest',
    date: '04/06/15',
    totalCount: 0
},{
    name: 'Back',
    date: '04/05/15',
    totalCount: 0
},{
    name: 'Biceps',
    date: '04/04/15',
    totalCount: 0
},{
    name: 'Triceps',
    date: '04/03/15',
    totalCount: 0
},{
    name: 'Deadlift',
    date: '04/02/15',
    totalCount: 0
},{
    name: 'Legs',
    date: '04/01/15',
    totalCount: 0
},{
    name: 'Shoulders',
    date: '03/31/15',
    totalCount: 0
},{
    name: 'Core',
    date: '03/30/15',
    totalCount: 0
},{
    name: 'Rest',
    date: '03/29/15',
    totalCount: 0
}];

mongoose.connect('mongodb://localhost/my_app');

mongoose.connection.once('open', function(){
    Person.remove({}, function(){
            Workout.remove({}, function(){
                Person.create(people, function(err, _people){
                    Workout.create(workouts, function(err, _workouts) {
                        console.log('connected');
                        
                        })
                    })
                })
    })
});



var app = express();

app.use(express.static(__dirname + '/client'));

app.get("/api/workouts", function(req, res) {
    Workout.find({}, function(err, _results){
        res.send(_results);
    })
})

app.get("/api/workouts/:id", function(req, res){
    Workout.findById(req.params.id, function(err, result){
        res.send(result);
    })
})

app.get("/api/things", function(req, res){
    Thing.find({}, function(err, results){
        res.send(results);
    })
})

app.get("/api/things/:id", function(req, res){
    Thing.findById(req.params.id, function(err, result) {
        res.send(result);
    })
})

app.delete("/api/things/:id", function(req, res){
    Thing.remove({_id: req.params.id}, function(){
        res.send({});
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

app.delete("/api/people/:id", function(req, res){
    Person.remove({_id: req.params.id}, function() {
        res.send({});
    })
})

app.get("/", function(req, res){
    fs.readFile(__dirname + '/index.html', 'utf8', function(err, html){
         res.send(html);
    })
})

app.listen(process.env.PORT);

