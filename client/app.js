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

angular.module('app').factory('NavSvc', function(){
    var _tabs = [
        {
            title: "Home",
            path:"#/"
        },
        {
            title: "People",
            path:"#/people"
        },
        {
            title: "Workouts",
            path:"#/workouts"
        }
    ];
    return {
        tabs: _tabs,
        setTab: function(title){
            _tabs.forEach(function(tab){
                if (tab.title == title)
                    tab.active =  true;
                else
                    tab.active = false;
            });
        }
    }
})

angular.module('app').controller("NavCtrl", function($scope, NavSvc){
    $scope.tabs = NavSvc.tabs;
})

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


angular.module('app').factory('WorkoutsSvc', function($http, $q){
    return{
        getWorkouts: function(){
            // return $http.get('/api/workouts/');
            var dfd = $q.defer();
            $http.get('/api/workouts/').then(function(result){
                dfd.resolve(result.data);
            });
            return dfd.promise;
        },
        getWorkout: function(id){
            // return $http.get('/api/workouts/' + id);
            var dfd = $q.defer();
            $http.get('/api/workouts/' + id).then(function(result) {
                dfd.resolve(result.data);
            })
            return dfd.promise;
        }
    }
})

angular.module('app').controller('WorkoutsCtrl', function($scope, WorkoutsSvc, NavSvc){
    WorkoutsSvc.getWorkouts().then(function(workouts){
        $scope.workouts = workouts;
    });
    NavSvc.setTab("Workouts");
})

angular.module('app').controller('WorkoutCtrl', function($scope, $routeParams, WorkoutsSvc){
    WorkoutsSvc.getWorkout($routeParams.id).then(function(workout){
        $scope.workout = workout;
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

angular.module('app').factory('PeopleSvc', function($http, $q){
    return{
        getPeople: function(){
            // return $http.get('/api/people');
            var dfd = $q.defer();
            $http.get('/api/people').then(function(result){
                dfd.resolve(result.data);
            })
            return dfd.promise;
        },
        getPerson: function(id){
            // return $http.get('/api/people/' + id);
            var dfd = $q.defer();
            $http.get('/api/people/' + id).then(function(result){
                dfd.resolve(result.data);
            })
            return dfd.promise;
        },
        deletePerson: function(id){
            // return $http.delete('/api/people/' + id);
            var dfd = $q.defer();
            $http.delete('/api/people/' + id).then(function(result){
                dfd.resolve(result.data);
            })
            return dfd.promise;
        }
    };
});

angular.module('app').controller('PeopleCtrl', function($scope, PeopleSvc, NavSvc){
    // PeopleSvc.getPeople().then(function(result){
    //     $scope.people = result.data;
    // })
    
    function activate(){
        PeopleSvc.getPeople().then(function(people){
            $scope.people = people;
        })
    }
    
    activate();
    
    $scope.delete = function(person){
        PeopleSvc.deletePerson(person).then(function(){
            activate();
            console.log('deleted person');
        })
    }
    
    NavSvc.setTab("People");
});

angular.module('app').controller('PersonCtrl', function($scope, $routeParams, PeopleSvc){
    PeopleSvc.getPerson($routeParams.id).then(function(person){
        $scope.person = person;
    });
});

angular.module('app').controller('HomeCtrl', function($scope, NavSvc){
    $scope.message = 'hello from home tab';
    NavSvc.setTab("Home");
});

