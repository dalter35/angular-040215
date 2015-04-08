describe("Person does workout!", function(){
  var person, workout;
  beforeEach(function(done){
      Person.doWorkout(Run._id, Dave._id, function(){
          Workout.findOne(Run._id, function(err, _foundworkout) {
              Person.findOne(Dave._id, function(err, _foundperson) {
                  workout = _foundworkout;
                  person = _foundperson;
                  done();
              })
          })
      })
  })
  it("dave went on a run", function(){
      expect(person.name).toEqual('Dave');
      console.log(person);
  })
});