var mongoose = require("mongoose");

var workoutModel = require("../models/workout")
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

personSchema.statics.findAll = function(cb){
    this.find({}, cb);  
};

personSchema.statics.doWorkout = function(workoutId, personId, cb){
    Workout.findOne({_id: workoutId}, function(err, _foundworkout){
        var qry = {_id: personId};
        var update = {$push: {workoutsDone: _foundworkout.id},
            $inc: {workoutCounter: 1}
        };
        Person.update(qry, update, function(err, _msg1, _msg2){
            
            Person.findOne({_id: personId}, function(err, _foundperson){
                var qry2 = {_id: workoutId};
                var update2 = {
                    $push: {personRec: _foundperson.id},
                    $inc: {totalCount: 1}    
                };
                Workout.update(qry2, update2, function(err, _msg3, _msg4){
                    cb();  
                })
            });
        })    
    });
};

var Person = mongoose.model('Person', personSchema);

module.exports = {
    Person: Person
}