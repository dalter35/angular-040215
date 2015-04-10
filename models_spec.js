var model = require('./server');
var Person = model.Person;
var Workout = model.Workout;

// describe("Person does workout!", function(){
//   var person, workout;
//   beforeEach(function(done){
//       Person.doWorkout(seededWorkouts[8], seededPeople[1], function(){
//           Workout.findOne(seededWorkouts[8], function(err, _foundworkout) {
//               Person.findOne(seededPeople[1], function(err, _foundperson) {
//                   workout = _foundworkout;
//                   person = _foundperson;
//                   done();
//               })
//           })
//       })
//   })
//   it("dave did shoulders", function(){
//       expect(person.name).toEqual('Dave');
//       console.log(person);
//   })
// });