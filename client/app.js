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

angular.module('app').controller('ThingsCtrl', function($scope, ThingSvc){
    ThingSvc.getThings().then(function(result){
        $scope.things = result.data;
    });
    
    function activate(){
        ThingSvc.getThings().then(function(things){
            $scope.things = things.data;
           console.log(things.data);
        })
    };
    
  //  activate();
    
    $scope.delete = function(thing){
        ThingSvc.deleteThing(thing).then(function(){
            activate();  
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
        }
    };
});

angular.module('app').controller('PeopleCtrl', function($scope, PeopleSvc){
    PeopleSvc.getPeople().then(function(result){
        $scope.people = result.data;
    })
});

angular.module('app').controller('PersonCtrl', function($scope, $routeParams, PeopleSvc){
    PeopleSvc.getPerson($routeParams.id).then(function(result){
        $scope.person = result.data;
    });
});

angular.module('app').controller('HomeCtrl', function($scope){
    $scope.message = 'hello from home tab';
});

