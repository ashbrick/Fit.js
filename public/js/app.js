const app = angular.module('WorkoutApp', []);

app.controller('MyController', ['$http', function($http){
  this.foo ='bar';

  this.createWorkout = function(){
    $http({
      method:'POST',
      url: '/workouts',
      data: {
        type: this.type,
        duration: this.duration,
        sets: this.sets,
        reps: this.reps,
        rest: this.rest
      }
    }).then(function(response){
      console.log(response);
    }, function(){
      console.log('error');
    });
  }
}]);
