var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
//var describe = require('jasmine-node');

var people = [{
    name: 'Dave'
}, {
    name: 'Brian'
}, {
    name: 'Sean'
},{
    name: 'Dave'
}];

var personSchema = new mongoose.Schema({
    name: String,
    workoutCounter: {
        type: Number,
        default: 0
    },
    workoutsDone: [{
        type: mongoose.Schema.ObjectId,
        ref: "Workout"    
    }]
});

var Person = mongoose.model('Person', personSchema);

personSchema.statics.doWorkout = function(workoutId, personId, cb){
    Workout.findOne({_id: workoutId}, function(err, _foundworkout){
        var qry = {_id: personId};
        var update = {$push: {workoutsDone: _foundworkout.name},
            $inc: {workoutCounter: 1}
        };
        Person.update(qry, update, function(err, _msg1, _msg2){
            Person.findOne({_id: personId}, function(err, _foundperson){
                var qry2 = {_id: workoutId};
                var update2 = {
                    $push: {personRec: _foundperson.name},
                    $inc: {workoutCounter: 1}    
                };
            })
                Workout.update(qry2, update2, function(){
                    cb();  
            });
        })    
    });
};



var things = [{
   name: 'Scotch' 
}, {
   name: 'Whiskey' 
}, {
   name: 'Bourbon' 
},{
   name: 'Water' 
}];

var thingSchema = new mongoose.Schema({
   name: String 
});

var Thing = mongoose.model('Thing', thingSchema);

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

var workoutSchema = new mongoose.Schema({
    name: String,
    date: String,
    totalCount: {
        type: Number,
        default: 0
    },
    personRec: [{
        type: mongoose.Schema.ObjectId,
        ref: "Workout"
    }]
});

var Workout = mongoose.model("Workout", workoutSchema);

mongoose.connect('mongodb://localhost/my_app');
mongoose.connection.once('open', function(){
    // Person.find({}, function(err, peopleResults){
    //     if (peopleResults.length == 0)
    //         Person.create(people, function(err, singleplatformers){
    //             Thing.create(things, function(err, spirits){
    //                 console.log(singleplatformers);
    //                 console.log(spirits);
    //             })
                
    //         });
    //     });
    
    Person.remove({}, function(){
        Thing.remove({}, function(){
            Workout.remove({}, function(){
              Thing.create(things, function(err, _things){
                Person.create(people, function(err, _people){
                    Workout.create(workouts, function(err, _workouts) {
                        console.log('connected');                        
                        })
                    })
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

module.exports = {
    Person: Person,
    Thing : Thing,
    Workout : Workout
}