var mongoose = require('mongoose');

var personModel = require("./models/person")
var workoutModel = require("./models/workout")
var Person = personModel.Person;
var Workout = workoutModel.Workout;

function connect (cb) {
    mongoose.connect('mongodb://localhost/my_app');
    mongoose.connection.once('open', function(){
        cb();
    });
}

function disconnect (cb) {
    mongoose.disconnect(function(){
        cb();
    });
}

function seed(cb){
    
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

var people = [{
    name: 'Dave'
}, {
    name: 'Brian'
}, {
    name: 'Sean'
}, {
    name: 'Christine'
}];
    
    Person.remove({}, function(){
            Workout.remove({}, function(){
                Person.create(people, function(err, _people){
                    Workout.create(workouts, function(err, _workouts) {
                        cb(err, _people, _workouts);
                        })
                    })
                })
            })        
}

module.exports = {
    connect: connect,
    disconnect: disconnect,
    seed: seed,
    
} 


