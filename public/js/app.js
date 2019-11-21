const app = angular.module('WorkoutApp', []);

app.controller('MyController', ['$http', function($http){
  this.foo ='bar';
  const controller = this;

  this.getWorkouts = function(){
      $http({
          method: 'GET',
          url: '/workouts',
      }).then(function(response){
          controller.workouts = response.data;
          console.log(response.data)
      });
  }

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
        controller.getWorkouts();
      console.log(response);
    }, function(){
      console.log('error');
    });
  }

  this.getWorkouts();

}]);
