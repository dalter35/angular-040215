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
        .otherwise({
            controller: 'HomeCtrl',
            templateUrl: '/templates/home.html'
        })
});

angular.module('app').factory('PeopleSvc', function($http){
    return{
        getPeople: function(){
            return $http.get('/api/people');
        }
    }
})

angular.module('app').controller('PeopleCtrl', function($scope, PeopleSvc){
    PeopleSvc.getPeople().then(function(result){
        $scope.people = result.data;
    })
});

angular.module('app').controller('HomeCtrl', function($scope){
    $scope.message = 'hello from home tab';
});

angular.module('app').controller('ThingsCtrl', function($scope){
    $scope.message = 'hello from things tab'
})