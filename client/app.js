angular.module('app', ['ngRoute']);

angular.module('app').config(function($routeProvider){
    $routeProvider
        .when('/people', {
            controller: 'PeopleCtrl',
            templateUrl: '/templates/people.html'
        })
        .when('/things', {
            controller: 'ThingsCtrl',
            templateUrl: '/templates/things.html'
        })
        .when('/things/:id', {
            controller: 'ThingCtrl',
            templateUrl: '/templates/thing.html'
        })
        .when('/people/:id', {
            controller: 'PersonCtrl',
            templateUrl: '/templates/person.html'
        })
        .when('/workouts', {
            controller: 'WorkoutsCtrl',
            templateUrl: '/templates/workouts.html'
        })
        .when('/workouts/:id', {
            controller: 'WorkoutCtrl',
            templateUrl: '/templates/workout.html'
        })
        .otherwise({
            controller: 'HomeCtrl',
            templateUrl: '/templates/home.html'
        })
});

angular.module('app').factory('ThingSvc', function($http){
    return{
        getThings: function(){
            return $http.get('/api/things');
        },
        getThing: function(id){
            return $http.get('/api/things/' + id);
        },
        deleteThing: function(id){
            return $http.delete("/api/things/" + id);
        }
    }
});


angular.module('app').factory('WorkoutsSvc', function($http){
    return{
        getWorkouts: function(){
            return $http.get('/api/workouts/');
        },
        getWorkout: function(id){
            return $http.get('/api/workouts/' + id);
        }
    }
})

angular.module('app').controller('WorkoutsCtrl', function($scope, WorkoutsSvc){
    WorkoutsSvc.getWorkouts().then(function(result){
        $scope.workouts = result.data;
    })
})

angular.module('app').controller('WorkoutCtrl', function($scope, $routeParams, WorkoutsSvc){
    WorkoutsSvc.getWorkout($routeParams.id).then(function(result){
        $scope.workout = result.data;
    })
})

angular.module('app').controller('ThingsCtrl', function($scope, ThingSvc){
    ThingSvc.getThings().then(function(result){
        $scope.things = result.data;
    });
    
    function activate(){
        ThingSvc.getThings().then(function(things){
            $scope.things = things.data;
            //console.log(things.data); //print remaining things to console
            console.log('deleted thing');
        })
    };
    
  //  activate(); dont need to initally call here since getThings was already called above
    
    $scope.delete = function(thing){
        ThingSvc.deleteThing(thing).then(function(){
            activate();  //return things that werent deleted
           })
        }
});

angular.module('app').controller('ThingCtrl', function($scope, $routeParams, ThingSvc){
    ThingSvc.getThing($routeParams.id).then(function(result){
        $scope.thing = result.data;
    })
});

angular.module('app').factory('PeopleSvc', function($http){
    return{
        getPeople: function(){
            return $http.get('/api/people');
        },
        getPerson: function(id){
            return $http.get('/api/people/' + id);
        },
        deletePerson: function(id){
            return $http.delete('/api/people/' + id);
        }
    };
});

angular.module('app').controller('PeopleCtrl', function($scope, PeopleSvc){
    // PeopleSvc.getPeople().then(function(result){
    //     $scope.people = result.data;
    // })
    
    function activate(){
        PeopleSvc.getPeople().then(function(people){
            $scope.people = people.data;
        })
    }
    
    activate();
    
    $scope.delete = function(person){
        PeopleSvc.deletePerson(person).then(function(){
            activate();
            console.log('deleted person');
        })
    }
});

angular.module('app').controller('PersonCtrl', function($scope, $routeParams, PeopleSvc){
    PeopleSvc.getPerson($routeParams.id).then(function(result){
        $scope.person = result.data;
    });
});

angular.module('app').controller('HomeCtrl', function($scope){
    $scope.message = 'hello from home tab';
});

