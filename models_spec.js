var db = require("./dbConfig")
var personModel = require("./models/person")
var workoutModel = require("./models/workout")
var Person = personModel.Person;
var Workout = workoutModel.Workout;

describe('people & workouts', function(){
var people, workouts;
   beforeEach(function(done){
        db.connect(function(){
           console.log('connected')
           db.seed(function(err, _people, _workouts){
                people = _people;
                workouts = _workouts;
                console.log('seeded');
                done();
           })
           
       })
    })
    afterEach(function(done){
        db.disconnect(function(){
            console.log('disconnected')
            done();
        })
    })
    
    describe('doWorkout', function(){
    var foundWorkout; 
    var foundPerson;  
        beforeEach(function(done){
            Person.doWorkout(workouts[1]._id, people[0]._id, function(err, msg1, msg2){
            // console.log(err);
                Workout.findById(workouts[1]._id, function(err, _foundChest){
                    foundWorkout = _foundChest;
                    
                        Person.findById(people[0]._id, function(err, _foundDave){
                            foundPerson = _foundDave;
                            //console.log(foundWorkout);
                            done();
                    })
                })
            })
        })
        
        it('dave does chest', function(){
            expect(foundPerson.name).toEqual('Dave');
            expect(foundWorkout.name).toEqual('Chest');
            expect(foundWorkout.totalCount).toEqual(1);
            console.log(foundPerson);
            console.log(foundWorkout); 
        })
    })
    
    // describe("findAll", function(){
    //   var people = [];
    //   beforeEach(function(done){
    //       Person.findAll(function(err, _peopleArray){
    //           people = _peopleArray;
    //           done();
    //       }) 
    //   });
    //   it('can find everyone', function(){
    //       expect(people.length).toEqual(4);
    //       console.log('found everyone');
    //   });
    // });
    
});
