var mongoose = require("mongoose");

var personModel = require("../models/person")
var Person = personModel.Person;

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

module.exports = {
    Workout: Workout
}